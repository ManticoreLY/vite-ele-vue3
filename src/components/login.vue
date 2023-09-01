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

const router = useRouter()
const userId = cookie.get('userId')
const user = getData('user')
if (userId) { //已登录
  router.push('/main/index')
}

function toLogin() {-
  login(form.value).then(res => {
    ElMessage.success('登录成功!')
    const user = res.data
    cookie.set('userId', user.userId) // cookie存userId
    setData('user', user)
    router.push('/main/index')
  }, error => {
    ElMessage.error(error)
  })
}

function alert() {
  ElMessage.success('请联系项目负责人!')
}

function onRegister() {
  registerVisible.value = true
}

const rform = ref({
  phoneNum: '',
  userName: '',
  password: '',
  idCard: '',
  bankCard: '',
  cardAddr: '',
})

const registerVisible = ref(false)

</script>

<template>
  <div class="bg">
    <div class="title">东艺集团</div>
    <div class="login-win">
      <div class="col">你好, 请登录</div>
      <div class="form">
        <el-form :model="form" label-width="80px" size="large">
          <el-form-item label="手机号">
            <el-input v-model="form.phoneNum" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter="toLogin"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="toLogin" style="width: 100%">登录</el-button>
          </el-form-item>
          <div style="padding-left: 80px;" class="flex justify-between">
            <el-button type="text" @click="onRegister">新人注册</el-button>
            <el-button type="text" @click="alert">忘记密码</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog title="新人注册" v-model="registerVisible" width="480px">
      <el-form :model="rform" label-width="100px" size="large" style="max-width: 400px">
        <el-form-item label="姓名" prop="phoneNum">
          <el-input v-model="rform.userName" placeholder="请填写自己的姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="rform.phoneNum" placeholder="填写现在用的手机号码">
            <template #append>
              <el-button>验证</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input v-model="rform.idCard" placeholder="填写自己的身份证号码" maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankCard">
          <el-input v-model="rform.bankCard" placeholder="填写现用的银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="cardAddr">
          <el-input v-model="rform.cardAddr" placeholder="填写银行卡的开户行地址"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary">确定</el-button>
        <el-button @click="registerVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.bg{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .title{
    position: absolute;
    left: 20px;
    top: 20px;
    color: #f9f9f9;
    font-weight: 800;
    font-size: 36px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .login-win{
    position: relative;
    width: 540px;
    height: 360px;
    border-radius: 12px;
    box-shadow: 0 5px 12px 0 #efefef;
    background-color: #f9f9f9;
    .col{
      width: 100%;
      height: 80px;
      line-height: 80px;
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