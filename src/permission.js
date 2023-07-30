import router from '@/router/index.js'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getData } from '@/utils/storage'
import cookie from '@/utils/cookies'
import menuConfig from '@/config/menuConfig'
import { findById } from '@/api/user'

function findAuthByPath(path) {
    const item = menuConfig.find(item => item.path === path)
    if (item) return item.auth
    else {
        menuConfig.forEach(item => {
            if (item.children && item.children) {
                const it = item.children.find(t => t.path === path)
                if (it) return item.auth
                else return []
            }
        })
    }
}

const user = getData('user')
router.beforeEach(async(from, to, next) => {
   if (user && user.auth) {
       if (findAuthByPath(to.path).includes(user.auth)) next()
       else next('/main/index')
   } else {
       const userId = cookie.get('userId')
       findById(userId).then(res => {
           const u = res.data
           if (findAuthByPath(to.path).includes(u.auth)) next()
           else next('/main/index')
       })
   }
   next()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})