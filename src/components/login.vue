<script setup>
import { login } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import cookie from '@/utils/cookies.js'
import { getData, setData } from '@/utils/storage.js'

const form = ref({
  phoneNum: '',
  password: ''
})

const loginStep = ref(1)

const router = useRouter()

const userId = cookie.get('userId')
const user = getData('user')
if (userId) { //已登录
  if (user.userAuth === 'admin') router.push('/main/user')
  else if (user.userAuth === 'manager') router.push('/main')
  else if (user.userAuth === 'user') router.push('/main/worker')
}

function toLogin() {-
  login(form.value).then(res => {
    ElMessage.success('登录成功!')
    const user = res.data
    cookie.set('userId', user.userId) // cookie存userId
    setData('user', user)
    if (user.userAuth === 'admin') router.push('/main/user')
    else if (user.userAuth === 'manager') router.push('/main')
    else if (user.userAuth === 'user') router.push('/main/worker')
  }, error => {
    ElMessage.error(error)
  })
}

</script>

<template>
  <div class="bg">
    <div v-if="loginStep === 1" class="login-win">
      <div class="col">登录</div>
      <div class="form">
        <el-form :model="form" label-width="80px" size="large">
          <el-form-item label="手机号">
            <el-input v-model="form.phoneNum" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter="toLogin"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-btn">
        <el-button type="text" size="large">新人注册</el-button>
        <el-button type="primary" size="large" @click="toLogin">登录</el-button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
.bg{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-win{
    position: relative;
    width: 540px;
    height: 360px;
    border-radius: 12px;
    box-shadow: 0 5px 12px 0 #efefef;
    background-color: #FFFFFF;
    .col{
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      font-weight: 800;
    }
    .form{
      padding: 30px 60px 20px 20px;
    }
    .login-btn{
      padding: 30px 60px 20px 20px;
      text-align: right;
    }
  }
}
</style>