import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import store from '@/store'
Vue.use(VueRouter)

// 重写push、replace
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve || reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve || reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})
// 路由全局前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let userName = store.state.user.userInfo.name
  // next()
  // 如果登录了
  if (token) {
    // 如果登陆了，去login
    if (to.path == '/login') {
      next('/home')
    } else {
      // 如果登录了，没去login
      if (userName) {
        // 如果有用户信息，直接放行
        next()
      } else {
        // 如果没有用户信息，派发action获取用户信息
        try {
          await store.dispatch('user/userInfo')
          next()
        } catch (error) {
          // token失效了，清除已经存储的token
          store.dispatch('user/userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 用户没登录
    let toPath = to.path
    // 如果去的是需要登录的页面
    if (toPath.indexOf('/pay') != -1 || toPath.indexOf('/trade') != -1 || toPath.indexOf('/center') != -1) {
      // 去登录界面，顺便把要去的路径带上
      next(`/login?redirect=${toPath}`)
    } else {
      next()
    }
  }

})
export default router
