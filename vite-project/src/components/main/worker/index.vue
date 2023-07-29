<script setup>
import { ref } from 'vue'
import { workerStatusConfig } from '@/config/dataConfig.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import base from '@/api'

const workerApi = base('worker')

const query = ref({
  workerName: '',
  workerPhone: '',
  status: ''
})

const dataList = ref([])

findAll()

function findAll() {
  workerApi.list(query.value).then(res => {
    dataList.value = res.data
  }, err => {
    ElMessage.error(err)
  })
}

const model = ref({
  title: '工人修改',
  visible: false,
  isEdit: false
})

function addWorker() {
  model.value.title = '新建工人'
  model.value.visible = true
  model.value.isEdit = false
}

const statusFormat = (r) => {
  const item = workerStatusConfig.find(item => item.value === r.status)
  if (item) return item.name
  return ''
}

function editWorker(item) {
  form.value = Object.assign(form.value, item)
  model.value.title = '编辑工人'
  model.value.visible = true
  model.value.isEdit = true
}

function remove(workerId) {
  ElMessageBox.confirm('', '是否确认删除该工人?').then(() => {
    workerApi.remove(workerId).then(() => {
      findAll()
    }, err => {
      ElMessage.error(err)
    })
  })
}

const form = ref({
  workerName: '', // 姓名
  workerPhone: '', // 手机号
  status: '', // 状态
  idCode: '' // 项目ID
})

function save() {
  if (model.value.isEdit) {
    workerApi.update(form.value).then(res => {
      ElMessage.success('数据更新成功!')
      findAll()
      handleClose()
    })
  } else {
    workerApi.save(form.value).then(res => {
      ElMessage.success('数据新建成功!')
      findAll()
      handleClose()
    })
  }
}

function handleClose() {
  model.value.title = ''
  model.value.visible = false
  model.value.isEdit = false

  form.value = Object.assign(form.value, {
    workerName: '', // 姓名
    workerPhone: '', // 手机号
    status: '', // 状态
    idCode: '' // 项目ID
  })
}

</script>

<template>
  <div class="flex">
    <el-form :model="query" inline>
      <el-form-item label="姓名">
        <el-input v-model="query.workerName" placeholder="靖输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="query.workerPhone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" placeholder="请选择状态">
          <el-option v-for="option in workerStatusConfig" :key="option.value" :value="option.value" :label="option.name" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findAll">查询</el-button>
        <el-button type="success" @click="addWorker">新建工人</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-divider />
  <el-table :data="dataList">
    <el-table-column label="序号" type="index" width="80"></el-table-column>
    <el-table-column label="姓名" prop="workerName"></el-table-column>
    <el-table-column label="手机号" prop="workerPhone"></el-table-column>
    <el-table-column label="身份证" prop="idCode"></el-table-column>
    <el-table-column label="状态" prop="status" :formatter="statusFormat"></el-table-column>
    <el-table-column label="操作" #default="{ row }">
      <el-button type="text" @click="editWorker(row)">编辑</el-button>
      <el-button type="text" @click="remove(row.workerId)">删除</el-button>
    </el-table-column>
  </el-table>

  <div class="pagination">
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>

  <el-dialog v-model="model.visible" :title="model.title" width="600px" :before-close="handleClose">
    <el-form :model="form" size="large" label-width="96px">
      <el-form-item label="姓名">
        <el-input v-model="form.workerName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.workerPhone" placeholder="请输入手机号" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="form.idCode" placeholder="请输入身份证" maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请设置状态">
          <el-option v-for="option in workerStatusConfig" :key="option.value" :value="option.value" :label="option.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button plain @click="handleClose">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-dialog>

</template>

<style lang="scss" scoped>

.pagination{
  display: flex;
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: center;
}
</style>