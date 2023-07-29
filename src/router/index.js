import { createRouter, createWebHistory } from 'vue-router'
import login from '@/components/login.vue'
import Layout from '@/components/layout/index.vue'

const Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: login
        },
        {
            path: '/main',
            component: Layout,
            redirect: '/main/user',
            children: [
                {
                    path: 'user',
                    name: '用户管理',
                    component: import('@/components/main/user/index.vue')
                },
                {
                    path: 'project',
                    name: '项目管理',
                    component: import('@/components/main/project/index.vue')
                },
                {
                    path: 'building',
                    name: '楼栋配置',
                    component: import('@/components/main/work/building.vue')
                },
                {
                    path: 'floor',
                    name: '楼层管理',
                    component: import('@/components/main/work/floor.vue')
                },
                {
                    path: 'job',
                    name: '工序配置',
                    component: import('@/components/main/job/index.vue')
                },
                {
                    path: 'floorJob',
                    name: '工序管理',
                    component: import('@/components/main/job/floorJob.vue')
                },
                {
                    path: 'progress',
                    name: '进度管理',
                    component: import('@/components/main/progress/index.vue')
                },
                {
                    path: 'worker',
                    name: '工人管理',
                    component: import('@/components/main/worker/index.vue')
                },
                {
                    path: 'salary',
                    name: '工人结算',
                    component: import('@/components/main/worker/salary.vue')
                }
            ]
        }
    ]
})

export default Router