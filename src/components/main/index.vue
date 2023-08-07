<script setup>
import { listProject } from '@/api/project'
import { getData, setData } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import cookies from '@/utils/cookies'

const router = useRouter()

const user = getData('user')

if (user.userAuth === 'admin') {
  router.push('/main/user')
} else if (user.userAuth === 'manager') {
  router.push('/main/project')
} else if (user.userAuth === 'user') {
  router.push('/main/my')
}

const projectList = ref([])

listProject().then(res => {
  projectList.value = res.data
  if (user.userAuth !== 'admin') {
    const project = projectList.value.find(item => item.status === 1)
    if (project) {
      cookies.set('projectId', project.projectId)
      setData('project', project)
    } else {
      ElMessage.error('当前没有进行中的项目！')
    }
  }
})
</script>

<template>
空白页
</template>

<style scoped lang="scss">

</style>