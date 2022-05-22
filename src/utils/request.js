import axios from 'axios'

import { Message } from 'element-ui'

import store from '@/store'
import router from '@/router'

import {getTimeStamp} from '@/utils/auth'

// 定义超时时间
const TimeOut = 3600

const service = axios.create({
  // npm run dev  值为/api  开发环境
  // npm run build 值为/prod-api  生产环境
  baseURL: process.env.VUE_APP_BASE_API,
  timeout:5000  //定义5秒超时
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 统一向请求头上设置token

  if (store.getters.token) {
  //  只有在有token的时候，才有必要去检查时间戳是否超时
    if (IsCheckTimeOut()) {
    //  为true 表示过期了  token没有用了
      store.dispatch('user/loginout')  //退出操作
      // 跳转到登录页面
      router.push('/login')
      return Promise.reject(new Error("token超时了"))
   }
    // 如果token存在  把token设置到请求头上
    config.headers['Authorization']=`Bearer ${store.getters.token}`
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) { //响应成功
  // 对响应数据做点什么
  // response 就是响应的数据  多加了一层data
  const { success, message, data } = response.data
  // 根据success的成功与否 来进行操作
  if (success) {
     return data
  } else {
    // 提示错误信息  把每一个请求对错误数据的处理都统一写到这里
    // element-ui的message提示
    Message.error(message)
    return Promise.reject(new Error(message))  //让当前的执行跳出 直接进入catch
  }
  
}, function (error) {   //响应失败
  // 处理token失效问题
  // error 里面有response对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/loginout')
    router.push('/login')
  } else {
       // 对响应错误做点什么
  Message.error(error.message)  //错误提示
  }

  return Promise.reject(error);
});

// 定义检查时间戳的方法
// 当前时间-缓存中时间 是否大于 时间差
function IsCheckTimeOut () {
  var currentTime = Date.now()  //当前时间戳
  var timeStamp = getTimeStamp()  //缓存时间戳
  return (currentTime-timeStamp)/1000 >TimeOut
}


export default service;