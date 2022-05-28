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