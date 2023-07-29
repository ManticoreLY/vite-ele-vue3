import router from '@/router/index.js'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

router.beforeEach(async(from, to, next) => {
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})