const menus = [
    {
        id: "1-0",
        name: '用户管理',
        path: '/main/user',
        auth: ['admin']
    },
    {
        id: '2-0',
        name: '项目管理',
        path: '/main/project',
        auth: ['admin', 'manager'],
        children: []
    },
    {
        id: '3-0',
        name: '工人管理',
        path: '/main/worker',
        auth: ['admin', 'manager', 'user'],
        children: []
    },
    {
        id: '4-0',
        name: '工程量配置',
        auth: ['admin', 'manager'],
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
        ]
    },
    {
        id: '5-0',
        name: '工序管理',
        auth: ['admin', 'manager'],
        children: [
            {
                id: '5-1',
                name: '楼层工序配置',
                path: '/main/FloorJob',
            },
            {
                id: '5-2',
                name: '工序设置',
                path: '/main/job',
            },
        ]
    },
    {
        id: '6-0',
        name: '进度管理',
        path: '/main/progress',
        auth: ['manager']
    },
    {
        id: '7-0',
        name: '工资结算',
        path: '/main/salary',
        auth: ['admin', 'manager', 'user']
    }
]

export function getAuthMenus(auth) {
    return menus.filter(item => item.auth.includes(auth))
}

export default menus