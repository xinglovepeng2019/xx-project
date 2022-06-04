// vuex的权限模块
// 静态路由
import { constantRoutes,asyncRoutes } from '@/router'

// vuex的permission模块用来存放当前的  静态路由 + 当前用户的 权限路由

const state = {
  routes: constantRoutes   //所有用户默认拥有静态路由
}

const mutations = {
  // newRoutes  用户登录  通过权限所得到的动态路由部分   newRoutes权限路由
  setRoutes (state, newRoutes) {
    // 每次更新  都应该在静态路由的基础上进行追加
     state.routes = [...constantRoutes,...newRoutes]
  }
}

const actions = {
  // 帅选权限路由
  // menus 是当前用户所拥有的菜单权限  ["social_securitys","attendances","salarys"]
  // asyncRoutes  是所有的动态路由  [{pate:'setting',name:"setting"},{}]

  filterRoutes (context, menus) {
    const routes = []
    console.log(menus,"menus")
    menus.forEach(key => {
      // key就是标识
      // asyncRoutes 找 有没有对象中的name属性等于key的，如果找不到就没权限，如果找到就帅选出来
      routes.push(...asyncRoutes.filter(item=>item.name===key))   //得到一个数组  有可能有元素  也有可能是空数组
    })
    // routes 就是当前用户所拥有的  动态路由权限
    context.commit('setRoutes', routes)
    return routes   //state数据用来显示左侧菜单用的   return 是给路由addRoutes用的
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions

}