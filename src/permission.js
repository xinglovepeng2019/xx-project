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
      //  接收用户信息
        const { roles } = await store.dispatch('user/getUserInfo')
        // roles中存放的当前用户的权限
        // 根据用户资料获取数据，  帅选用户的可用的动态路由
        // routes  动态权限路由
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        // 动态路由 添加 到路由规则中，默认的路由规则 只有静态路由  没有动态路由
        router.addRoutes([...routes,{ path: '*', redirect: '/404', hidden: true }])
        // 添加完动态路由之后
        next(to.path)   //跳到对应的地址  相当于多做了一次跳转 为什么？
        // 进门了  但是进门之后 我要去的地方的璐还没有铺好，直接走  掉坑里，多做一次跳转，再从门外往里进一次
        // 跳转之前  把路铺好，再次进来的时候  路就铺好了
      } else {
        next()  //直接通行
     }

      
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