import request from '@/utils/request'

/* 
获取员工列表

*/

export function getEmployeeList (params) {
  // 返回一个axios对象
  return request({
    url: '/sys/user',
    params
 })
}


/* 
获取员工列表

*/

export function addEmployee(data) {
  // 返回一个axios对象
  return request({
    url: '/sys/user',
    data,
    method:"post"
 })
}

/* 
导入员工数据   参数data是一个数组类型

*/

export function importEmployee(data) {
  // 返回一个axios对象
  return request({
    url: '/sys/user/batch',
    data,
    method:"post"
 })
}