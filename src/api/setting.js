import request from '@/utils/request'


/* 
获取角色列表
*/
export function getRoleList (params) {
  // 返回一个axios对象
  return request({
    url: '/sys/role',
    params
 })
}


/* 
删除
*/
export function deleteRole (id) {
  // 返回一个axios对象
  return request({
    url: `/sys/role/${id}`,
    method:'delete'
 })
}

/* 
修改角色
*/
export function updateRole (data) {
  // 返回一个axios对象
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
 })
}

/* 
新增角色
*/
export function addRole (data) {
  // 返回一个axios对象
  return request({
    url: `/sys/role`,
    method: 'post',
    data
 })
}

/* 
获取角色详情
*/
export function getRoleDetail (id) {
  // 返回一个axios对象
  return request({
    url: `/sys/role/${id}`
 })
}