// 角色模块
import request from '@/utils/request'
// 获取所有角色
export const getAllRoleList = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}
// 保存或更新角色
export const saveOrUpdateRole = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
// 删除角色
export const delRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
// 获取角色
export const getRoleInfo = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}
// 按条件查询角色
export const getRolePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
// 获取所有菜单并按层级展示
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}
// 给角色分配菜单
export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}
// 获取角色拥有的菜单列表
export const getRoleMenus = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}
