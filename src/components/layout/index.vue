<script setup>
import { ref, inject } from 'vue'
import Menus from '@/components/layout/menus.vue'
import cookie from '@/utils/cookies.js'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { listProject } from '@/api/project.js'
import { ArrowDown } from '@element-plus/icons-vue'
import { getData, setData, removeData } from '@/utils/storage.js'

const reload = inject('reload')

const router = useRouter()
const projectName = ref('项目管理系统V1.0')
const userId = cookie.get('userId')
const projectId = cookie.get('projectId')

const user = getData('user')
const project = getData('project')
if (!userId) {
  ElMessage.error('登录状态已过期, 请重新登录!')
  router.push('/')
}


const projectModelVisible = ref(false)
const selectedProjectId = ref('')

const projectList = ref([])

listProject().then(res => {
  projectList.value = res.data
})

if (user.userAuth !== 'admin' && !projectId) {
  projectModelVisible.value = true
}

if(project) {
  projectName.value = `${project.projectName}管理系统`
}


function onSelectProject() {
  handleCommand(selectedProjectId.value)
  projectModelVisible.value = false
}
const handleCommand = (command) => {
  cookie.set('projectId', command)
  const project = projectList.value.find(item => item.projectId === command)
  if (project) {
    setData('project', project)
    reload()
  }
}

function logout() {
  ElMessageBox.confirm('', '确认退出登录吗?').then(() => {
    removeData('user')
    cookie.remove('userId')
    removeData('project')
    cookie.remove('projectId')
    router.push('/')
  })
}
</script>

<template>
  <el-container class="container">
    <el-header class="header">
      <div>{{ projectName }}</div>
      <div class="flex align-center">
        <el-button type="primary" icon="Refresh" style="margin-right: 20px;" @click="reload">刷新</el-button>
        <el-dropdown @command="handleCommand">
          <el-button type="success">
            切换项目
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in projectList" :key="item.projectId" :command="item.projectId" icon="Compass">{{ item.projectName }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="primary" style="margin-left: 20px;" @click="logout">退出登录</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside" width="240px">
        <menus />
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>

  <el-dialog v-model="projectModelVisible" title="请选择项目" width="480px">
    <el-radio-group v-model="selectedProjectId">
      <el-radio v-for="(project, index) in projectList" :key="index" :label="project.projectId">{{ project.projectName }}</el-radio>
    </el-radio-group>
    <template #footer>
      <el-button type="primary" @click="onSelectProject">进入系统</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.container{
  position: relative;
  width: 100%;
  height: 100%;
  .header{
    height: 64px;
    background-color: #545c64;
    width: 100%;
    color: #FFFFFF;
    font-size: 24px;
    border-bottom: 1px solid #f9f9f9;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .aside{
    top: 80px;
    bottom: 0;
    background-color: #545c64;
  }
  .main{
    background-color: #f9f9f9;
  }
}

</style>