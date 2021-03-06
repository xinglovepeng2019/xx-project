// 导出员工的路由规则
import Layout from '@/layout'

export default {
  path: '/employees', //路径
  name: "employees",
  component: Layout,
  // 配置二级路由
  children: [
    {
      // path什么都不写的时候，表示该路由为当前二级路由的默认路由
      path: "",
      component: () => import('@/views/employees'),
      meta: {
        // meta属性的里面的属性
        // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        title: '员工管理',
        icon:"people"
      }
    },
    {
      path: 'detail/:id', //动态路由参数
      component: () => import('@/views/employees/detail'),
      hidden: true, //不在左侧菜单显示
      meta: {
        title:"员工详情"
      }
    },
    {
      path: 'print/:id', //动态路由参数
      component: () => import('@/views/employees/print'),
      hidden: true, //不在左侧菜单显示
      meta: {
        title: "员工打印",
        icon:'people'
      }
    }
  ]
}

// /employees是访问地址layout组件会显示 你的二级路由的默认组件也会显示