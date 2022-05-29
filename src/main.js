import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Components from '@/components'
import xlsx from 'xlsx'
console.log(xlsx,"xlsx2")

import PageTools from '@/components/PageTools'
Vue.component('PageTools',PageTools)

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives'

// 遍历所有的导出的指令对象，完成自定义指令的全局注册

Object.keys(directives).forEach(key => {
  // key就是指令的名称
  // console.log(key, "key")
  // 全局注册自定义指令
  Vue.directive(key,directives[key])
})

// 过滤器

import * as filters from '@/filters' 
console.log(filters,"filres")
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key,filters[key])
})


// 注册自定义组件
Vue.use(Components)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 注释
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
