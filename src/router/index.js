import Vue from 'vue'
import Router from 'vue-router'

import approvalsRouter from './modules/approvals'
import attendancesRouter from './modules/attendances'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
Vue.use(Router)



/* Layout */
import Layout from '@/layout'


// 动态路由 

export const asyncRoutes = [
  approvalsRouter,
  attendancesRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  salarysRouter,
  settingRouter,
  socialRouter
]

// console.log(asyncRoutes,"asyncRoutes")


// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: "/import",
    component: Layout,
    hidden: true,  //不显示在左侧菜单栏中
    children: [
      {
        path: '',//什么都不写 表示默认的二级路由
        component:()=>import('@/views/import')
      }
    ]
  },
  // 404 page must be placed at the end !!!  必须放到最后
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 不是需要所有的动态路由，而是需要帅选出的动态路由   解除合并
  // routes: [...constantRoutes,...asyncRoutes]  //临时合并所有的路由
  routes: [...constantRoutes]   //只有静态路由
  // routes:constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
