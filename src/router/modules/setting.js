import Layout from '@/layout'

export default {
  path: '/setting', //路径
  name: "setting",
  component: Layout,
  // 配置二级路由
  children: [
    {
      // path什么都不写的时候，表示该路由为当前二级路由的默认路由
      path: "",
      component: () => import('@/views/setting'),
      meta: {
        // meta属性的里面的属性
        // 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
        title: '公司设置',
        icon:"setting"
      }
    }
  ]
}

// /employees是访问地址layout组件会显示 你的二级路由的默认组件也会显示