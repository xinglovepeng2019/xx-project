// 路由守卫
import router from '@/router'
import store from '@/store'
// 引入进度条插件
import Nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 定义白名单
const whiteList = ['/login','/404']

// 全局前置钩子
router.beforeEach(async function (to, from, next) {
  
  Nprogress.start()
  // 先判断是否有token  有token就是登录状态
  if (store.getters.token) {
    // 有token 继续判读是不是去登录页面
    if (to.path === '/login') {
      // 跳到主页
      next('/')
    } else {
     // 调用用户信息的action方法
     if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getUserInfo')
     }

      next()  //直接通行
    }
    
    

  } else {
    // 没有token  不是登录状态  就只能进入白名单的路由
    // 判断是否在白名单中
    if (whiteList.indexOf(to.path) > -1) {
      // 存在于白名单
      next()
    } else {
      next('/login')   //跳到登录页
    }
  }

 Nprogress.done()
})

// 全局后置钩子
router.afterEach(function (to, from) {
  console.log("afterEach")
  Nprogress.done()  //关闭进度条
})