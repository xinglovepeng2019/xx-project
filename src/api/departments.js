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
    url: `/company/department/${id}`,
    method:"delete"
 })
}

/* 
新增  
*/
export function addDepartments (data) {
  // 返回一个axios对象
  return request({
    url: `/company/department`,
    method: "post",
    data
 })
}


/* 
编辑 
*/
export function updateDepartments (data) {
  // 返回一个axios对象
  return request({
    url: `/company/department/${data.id}`,
    method: "put",
    data
 })
}

/* 
部门负责人数据 
*/
export function getEmployeeSimple () {
  // 返回一个axios对象
  return request({
    url: `/sys/user/simple`,

 })
}

/* 
获取部门详细信息
*/
export function getDepartDetail (id) {
  // 返回一个axios对象
  return request({
    url: `/company/department/${id}`,

 })
}