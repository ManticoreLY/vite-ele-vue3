const menus = [
    {
        id: "1-0",
        name: '用户管理',
        path: '/main/user',
        auth: ['admin', 'manager']
    },
    {
        id: '2-0',
        name: '项目管理',
        path: '/main/project',
        auth: ['manager', 'visitor'],
        children: []
    },
    {
        id: '3-0',
        name: '工人管理',
        path: '/main/worker',
        auth: ['manager', 'visitor'],
        children: []
    },
    {
        id: '4-0',
        name: '楼栋配置',
        path: '/main/building',
        auth: ['manager', 'visitor'],
    },
    {
        id: '5-0',
        name: '楼层管理',
        path: '/main/floor',
        auth: ['manager', 'visitor'],
    },
    /*{
        id: '4-0',
        name: '工程量配置',
        auth: ['manager'],
        path: '',
        children: [
            {
                id: '4-1',
                name: '楼栋配置',
                path: '/main/building'
            },
            {
                id: '4-2',
                name: '楼层管理',
                path: '/main/floor'
            },
            /!*{
                id: '4-3',
                name: '工程量配置',
                path: '/main/FloorJob',
            },*!/
        ]
    },*/
    {
        id: '6-0',
        name: '工序管理',
        auth: ['manager', 'visitor'],
        path: '/main/job',
    },
    {
        id: '7-0',
        name: '查看进度',
        path: '/main/progress',
        auth: ['manager', 'visitor']
    },
    {
        id: '8-0',
        name: '成本管理',
        auth: ['manager', 'visitor'],
        children: [
            {
                id: '7-1',
                name: '项目预算',
                path: '/main/budget'
            },
            {
                id: '7-2',
                name: '现金记账',
                path: '/main/account'
            }
        ]
    },
    {
        id: '9-0',
        name: '工资结算',
        path: '/main/salary',
        auth: ['manager', 'visitor']
    },
    {
        id: '10-0',
        name: '我的结算',
        path: '/main/my',
        auth: ['user']
    },
    {
        id: "11-0",
        name: '使用指导',
        path: '/main/guide',
        auth: ['manager', 'visitor']
    },
]

export function getAuthMenus(auth) {
    return menus.filter(item => item.auth.includes(auth))
}

export default menus