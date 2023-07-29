<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import base from '@/api'


const jobApi = base('job')

const query = ref({
  jobName: ''
})

const dataList = ref([])

function list() {
  jobApi.list().then(res => {
    dataList.value = res.data
  })
}

list()

function addItem() {
  model.value.title = '新建工序'
  model.value.visible = true
  model.value.isEdit = false
}
function editItem(job) {
  model.value.title = '编辑工序'
  model.value.visible = true
  model.value.isEdit = true

  form.value = Object.assign(form.value, job)
}
function removeItem(jobId) {
  jobApi.remove(jobId).then(() => {
    ElMessage.success('数据已移除')
    list()
  })
}

const model = ref({
  title: '用户修改',
  visible: false,
  isEdit: false
})


const form = ref({
  jobName: '', //
  jobUnit: '', //
  jobPrice: '', //
})

function handleClose() {
  model.value.title = ''
  model.value.visible = false
  model.value.isEdit = false

  form.value = Object.assign(form.value, {
    jobName: '', //
    jobUnit: '', //
    jobPrice: '', //
  })
}

function handleSave() {
  if (model.value.isEdit) {
    jobApi.update(form.value).then(() => {
      ElMessage.success('数据已更新！')
      list()
      handleClose()
    })
  } else {
    jobApi.save(form.value).then(() => {
      ElMessage.success('数据已添加！')
      list()
      handleClose()
    })
  }
}



</script>

<template>
  <div class="flex">
    <el-form :model="query" inline>
      <el-form-item label="工序名称">
        <el-input v-model="query.jobName" placeholder="请输入工序名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="list">查询</el-button>
        <el-button type="success" @click="addItem">新建工序</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="dataList">
    <el-table-column label="序号" type="index" width="80"></el-table-column>
    <el-table-column label="工序名称" prop="jobName"></el-table-column>
    <el-table-column label="工序单位" prop="jobUnit"></el-table-column>
    <el-table-column label="工序价格" prop="jobPrice"></el-table-column>
    <el-table-column label="操作" #default="{ row }">
      <el-button type="text" @click="editItem(row)">编辑</el-button>
      <el-button type="text" @click="removeItem(row.jobId)">删除</el-button>
    </el-table-column>
  </el-table>

  <el-dialog v-model="model.visible" :title="model.title" width="600px" :before-close="handleClose">
    <el-form :model="form" size="large" label-width="96px">
      <el-form-item label="工序名称">
        <el-input v-model="form.jobName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="工序单位">
        <el-input v-model="form.jobUnit" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="工序单价">
        <el-input v-model="form.jobPrice" type="number" placeholder="请输入工序单价"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button plain @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSave">确定</el-button>
    </template>
  </el-dialog>

</template>

<style scoped lang="scss">

</style>