import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index.js'
import './permission'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const vue = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    vue.component(key, component)
}
vue.use(router)
vue.use(ElementPlus)
vue.mount('#app')
