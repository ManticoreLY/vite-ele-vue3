import { createRouter, createWebHistory } from 'vue-router'

const Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/components/login.vue')
        },
        {
            path: '/main',
            component: () => import('@/components/layout/index.vue'),
            redirect: '/main/index',
            children: [
                {
                    path: 'index',
                    name: '空白页',
                    component: () => import('@/components/main/index.vue')
                },
                {
                    path: 'guide',
                    name: '使用引导',
                    component: () => import('@/components/main/guide.vue')
                },
                {
                    path: 'user',
                    name: '用户管理',
                    component: () => import('@/components/main/user/index.vue')
                },
                {
                    path: 'record',
                    name: '操作记录',
                    component: () => import('@/components/main/user/record.vue')
                },
                {
                    path: 'project',
                    name: '项目管理',
                    component: () => import('@/components/main/project/index.vue')
                },
                {
                    path: 'building',
                    name: '楼栋配置',
                    component: () => import('@/components/main/work/building.vue')
                },
                {
                    path: 'floor',
                    name: '楼层管理',
                    component: () => import('@/components/main/work/floor.vue')
                },
                {
                    path: 'job',
                    name: '工序配置',
                    component: () => import('@/components/main/job/index.vue')
                },
                {
                    path: 'floorJob',
                    name: '工序管理',
                    component: () => import('@/components/main/job/floorJob.vue')
                },
                {
                    path: 'progress',
                    name: '进度管理',
                    component: () => import('@/components/main/progress/index.vue')
                },
                {
                    path: 'worker',
                    name: '工人管理',
                    component: () => import('@/components/main/worker/index.vue')
                },
                {
                    path: 'budget',
                    name: '预算管理',
                    component: () => import('@/components/main/cost/budget.vue')
                },
                {
                    path: 'account',
                    name: '记账本',
                    component: () => import('@/components/main/cost/account.vue')
                },
                {
                    path: 'salary',
                    name: '工人结算',
                    component: () => import('@/components/main/worker/salary.vue')
                },
                {
                    path: 'my',
                    name: '我的结算',
                    component: () => import('@/components/main/worker/my.vue')
                }
            ]
        }
    ]
})

export default Router