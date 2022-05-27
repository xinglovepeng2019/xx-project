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