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
    <router-view  v-if="isRouterAlive"/>
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
  background-image: url('/mmgq.jpg');
  background-repeat: no-repeat;
  background-origin: content-box;
  background-size: 100% 100%;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
