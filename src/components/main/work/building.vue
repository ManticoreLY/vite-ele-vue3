<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import base from '@/api/index.js'


const api = base('building')


const dataList = ref([])

function list() {
  api.list().then(res => {
    dataList.value = res.data
  })
}

list()

function addItem() {
  model.value.title = '新建楼栋'
  model.value.visible = true
  model.value.isEdit = false
}
function editItem(job) {
  model.value.title = '编辑楼栋'
  model.value.visible = true
  model.value.isEdit = true

  form.value = Object.assign(form.value, job)
}
function removeItem(id) {
  ElMessageBox.confirm('', '确证删除该数据吗？').then(() => {
    api.remove(id).then(() => {
      ElMessage.success('数据已移除')
      list()
    })
  })

}

const model = ref({
  title: '编辑楼栋',
  visible: false,
  isEdit: false
})


const form = ref({
  buildingName: '', //
})

function handleClose() {
  model.value.title = ''
  model.value.visible = false
  model.value.isEdit = false

  form.value = Object.assign(form.value, {
    buildingName: '', //
  })
}

function handleSave() {
  if (model.value.isEdit) {
    api.update(form.value).then(() => {
      ElMessage.success('数据已更新！')
      list()
      handleClose()
    })
  } else {
    api.save(form.value).then(() => {
      ElMessage.success('数据已添加！')
      list()
      handleClose()
    })
  }
}



</script>

<template>
  <div class="flex">
    <el-form inline>
      <el-form-item>
        <el-button type="primary" @click="list">查询</el-button>
        <el-button type="success" @click="addItem">新建楼栋</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="dataList">
    <el-table-column label="序号" type="index" width="80"></el-table-column>
    <el-table-column label="楼栋号" prop="buildingName"></el-table-column>
    <el-table-column label="操作" #default="{ row }">
      <el-button type="text" @click="editItem(row)">编辑</el-button>
      <el-button type="text" @click="removeItem(row.buildingId)">删除</el-button>
    </el-table-column>
  </el-table>

  <el-dialog v-model="model.visible" :title="model.title" width="600px" :before-close="handleClose">
    <el-form :model="form" size="large" label-width="96px">
      <el-form-item label="楼栋号">
        <el-input v-model="form.buildingName" placeholder="请输入楼栋号"></el-input>
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