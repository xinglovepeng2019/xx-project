import request from '@/utils/request'

export function login (data) {
  // 返回一个axios对象
  return request({
    url: '/sys/login',
    method: "post",
    data
 })
}

/* 
获取用户基本资料
*/
export function getUserInfo (data) {
  // 返回一个axios对象
  return request({
    url: '/sys/profile',
    method: "post",
    data
 })
  
}

/* 
获取用户基本信息--头像--roleIds
*/
export function getUserDetailById (id) {
  // 返回一个axios对象
  return request({
    url: `/sys/user/${id}`
 })
}
export function getInfo(token) {
  
}

export function logout() {
  
}
