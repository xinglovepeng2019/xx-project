import axios from 'axios'

import { Message } from 'element-ui'

const service = axios.create({
  // npm run dev  值为/api  开发环境
  // npm run build 值为/prod-api  生产环境
  baseURL: process.env.VUE_APP_BASE_API,
  timeout:5000  //定义5秒超时
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
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
  // 对响应错误做点什么
  Message.error(error.message)  //错误提示
  return Promise.reject(error);
});

export default service;