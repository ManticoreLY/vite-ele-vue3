<script setup>
import { ref } from 'vue'
import { userAuthConfig, statusConfig } from '@/config/dataConfig.js'
import { queryUserList, saveUser, updateUser, removeUser, updateStatus } from '@/api/user.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getData } from '@/utils/storage.js'

const query = ref({
  userName: '',
  phoneNum: '',
  status: ''
})

const dataList = ref([])

findAll()

function findAll() {
  queryUserList(query.value).then(res => {
    dataList.value = res.data
  }, err => {
    ElMessage.error(err)
  })
}

const model = ref({
  title: '用户修改',
  visible: false,
  isEdit: false
})

function addUser() {
  model.value.title = '新建用户'
  model.value.visible = true
}

const statusFormat = (r) => {
  const item = statusConfig.find(item => item.value === r.status)
  if (item) return item.name
  return ''
}

const autoFormat = (row) => {
  const item = userAuthConfig.find(i => i.value === row.userAuth)
  if (item) return item.name
  return ''
}

function editUser(item) {
  form.value = Object.assign(form.value, item)
  model.value.title = '编辑用户'
  model.value.visible = true
  model.value.isEdit = true
}

function setStatus(userId, status) {
  updateStatus(userId, status).then(() => {
    findAll()
  }, err => {
    ElMessage.error(err)
  })
}

function remove(userId) {
  ElMessageBox.confirm('', '是否确认删除该用户?').then(() => {
    removeUser(userId).then(() => {
      findAll()
    }, err => {
      ElMessage.error(err)
    })
  })
}

const form = ref({
  userName: '', // 姓名
  phoneNum: '', // 手机号
  status: '', // 状态
  password: '', // 密码
  userAuth: '' // 权限级别
})

const authorize = (auth) => {
  const user = getData('user')
  if (user.userAuth !== 'admin' && auth === 'admin') return true
  return false
}



function save() {
  if (model.value.isEdit) {
    updateUser(form.value).then(res => {
      ElMessage.success('更新成功!')
      findAll()
      handleClose()
    })
  } else {
    saveUser(form.value).then(res => {
      ElMessage.success('用户新建成功!')
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
    userName: '',
    phoneNum: '',
    password: '',
    userAuth: '',
    status: ''
  })
}

</script>

<template>
  <div class="form">
    <el-form :model="query" inline>
      <el-form-item label="姓名">
        <el-input v-model="query.userName" placeholder="靖输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="query.phoneNum" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="query.status" placeholder="请选择状态">
          <el-option v-for="option in statusConfig" :key="option.value" :value="option.value" :label="option.name" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="findAll">查询</el-button>
        <el-button type="success" @click="addUser">新建用户</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-divider />
  <el-table :data="dataList">
    <el-table-column label="序号" type="index" width="80"></el-table-column>
    <el-table-column label="姓名" prop="userName"></el-table-column>
    <el-table-column label="手机号" prop="phoneNum"></el-table-column>
    <el-table-column label="状态" prop="status" :formatter="statusFormat"></el-table-column>
    <el-table-column label="用户权限" prop="userAuth" :formatter="autoFormat"></el-table-column>
    <el-table-column label="操作" #default="{ row }">
      <el-button v-if="row.status === 0" type="text" @click="setStatus(row.userId, 1)">启用</el-button>
      <el-button v-else-if="row.status === 1" type="text" plain @click="setStatus(row.userId, 0)">停用</el-button>
      <el-button type="text" @click="editUser(row)">编辑</el-button>
      <el-button type="text" @click="remove(row.userId)">删除</el-button>
    </el-table-column>
  </el-table>

  <div class="pagination">
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>

  <el-dialog v-model="model.visible" :title="model.title" width="600px" :before-close="handleClose">
    <el-form :model="form" size="large" label-width="96px">
      <el-form-item label="姓名">
        <el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phoneNum" placeholder="请输入手机号" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" active-text="启用" inactive-text="停用" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="权限设置">
        <el-select v-model="form.userAuth" placeholder="请设置用户权限级别">
          <el-option v-for="option in userAuthConfig" :key="option.value" :value="option.value" :label="option.name" :disabled="authorize(option.value)"></el-option>
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