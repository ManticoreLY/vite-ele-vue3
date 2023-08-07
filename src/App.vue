<script setup>
import { ref, provide, nextTick } from 'vue'

const isRouterAlive = ref(true)

function reload () {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<template>
  <div class="app">
    <router-view v-slot="{ Component }">
        <component v-if="isRouterAlive" :is="Component" />
    </router-view>
  </div>
</template>

<style scoped>
.app{
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url('/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
</style>
