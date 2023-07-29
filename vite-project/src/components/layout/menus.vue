<script setup>
import { ref } from 'vue'
import { getAuthMenus } from '@/config/menuConfig.js'
import { useRouter } from 'vue-router'
import { Flag, Cpu } from '@element-plus/icons-vue'
import { getData } from '@/utils/storage.js'

const router = useRouter()

const activeIndex = ref('')

const user = getData('user')
function handle(item) {
  activeIndex.value = item.id
  router.push(item.path)
}
function handleOpen() {}
function handleClose() {}

function handleSelect(item, num) {
  console.log(item, num)
}

</script>

<template>
  <div class="blank"></div>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="menu el-menu-vertical-demo"
      :default-active="activeIndex"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
  >
  <template v-for="(menu, index) in getAuthMenus(user.userAuth)" :key="menu.id">
    <el-menu-item v-if="!menu.children || menu.children.length === 0" :index="menu.id" @click="handle(menu)">
      <template #title>
        <el-icon><Flag /></el-icon>
        <span>{{ menu.name }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="menu.id">
      <template #title>
        <el-icon><Flag /></el-icon>
        <span>{{ menu.name }}</span>
      </template>
      <el-menu-item v-for="item in menu.children" :key="item.id" :index="item.id" @click="handle(item)">
        <template #title>
          <el-icon><Cpu /></el-icon>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </template>
  </el-menu>
</template>

<style lang="scss" scoped>
.blank{
  width: 100%;
  height: 60px;
}
</style>