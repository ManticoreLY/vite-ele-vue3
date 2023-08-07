<script setup>
import { ref } from 'vue'
import { projectStatusConfig } from '@/config/dataConfig.js'
import { listProject, saveProject, updateProject, removeProject, updateStatus } from '@/api/project.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const query = ref({
  projectName: '',
  status: ''
})

const dataList = ref([])

findAll()

function findAll() {
  listProject(query.value).then(res => {
    dataList.value = res.data
  }, err => {
    ElMessage.error(err)
  })
}

const model = ref({
  title: '项目修改',
  visible: false,
  isEdit: false
})

function addProject() {
  model.value.title = '新建项目'
  model.value.visible = true
}

const statusFormat = (r) => {
  const item = projectStatusConfig.find(item => item.value === r.status)
  if (item) return item.name
  return ''
}

function editProject(item) {
  form.value = Object.assign(form.value, item)
  model.value.title = '编辑项目'
  model.value.visible = true
  model.value.isEdit = true
}

function setStatus(projectId, status) {
  updateStatus(projectId, status).then(() => {
    findAll()
  }, err => {
    ElMessage.error(err)
  })
}

function remove(projectId) {
  ElMessageBox.confirm('', '是否确认删除该项目?').then(() => {
    removeProject(projectId).then(() => {
      findAll()
    }, err => {
      ElMessage.error(err)
    })
  })
}

const form = ref({
  projectName: '', // 项目名称
  status: '', // 状态
})

const projectList = ref([])

function queryList() {
  listProject().then(res => {
    projectList.value = res.data
  })
}

queryList()


function save() {
  if (model.value.isEdit) {
    updateProject(form.value).then(res => {
      ElMessage.success('更新成功!')
      findAll()
      handleClose()
    })
  } else {
    saveProject(form.value).then(res => {
      ElMessage.success('项目新建成功!')
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
    projectName: '',
    status: ''
  })
}

</script>

<template>
  <div class="form">
    <el-form :model="query" inline>
      <el-form-item label="项目名称">
        <el-input v-model="query.projectName" placeholder="靖输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" placeholder="请选择状态">
          <el-option v-for="option in projectStatusConfig" :key="option.value" :value="option.value" :label="option.name" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="findAll">查询</el-button>
        <el-button type="success" icon="Plus" @click="addProject">新建项目</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-divider />
  <el-table :data="dataList">
    <el-table-column label="序号" type="index" width="80"></el-table-column>
    <el-table-column label="项目名称" prop="projectName"></el-table-column>
    <el-table-column label="状态" prop="status" :formatter="statusFormat"></el-table-column>
    <el-table-column label="操作" #default="{ row }">
      <el-button v-if="row.status === 0" type="text" @click="setStatus(row.projectId, 1)">启用</el-button>
      <el-button v-else-if="row.status === 1" type="text" plain @click="setStatus(row.projectId, 0)">停用</el-button>
      <el-button type="text" @click="editProject(row)">编辑</el-button>
      <el-button type="text" @click="remove(row.projectId)">删除</el-button>
    </el-table-column>
  </el-table>

<!--  <div class="pagination">
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>-->

  <el-dialog v-model="model.visible" :title="model.title" width="600px" :before-close="handleClose">
    <el-form :model="form" size="large" label-width="96px">
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请设置状态">
          <el-option v-for="option in projectStatusConfig" :key="option.value" :value="option.value" :label="option.name"></el-option>
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
.form{
  width: 100%;
  display: flex;
}

.pagination{
  display: flex;
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: center;
}
</style>