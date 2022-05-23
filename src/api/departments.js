import request from '@/utils/request'


/* 
获取组织架构数据
*/
export function getDepartments (data) {
  // 返回一个axios对象
  return request({
    url: '/company/department',
 })
}

/* 
根据id 删除  
*/
export function delDepartments (id) {
  // 返回一个axios对象
  return request({
    url: ` /company/department/${id}`,
    method:"delete"
 })
}