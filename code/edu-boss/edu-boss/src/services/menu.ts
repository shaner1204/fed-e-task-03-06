// 菜单模块
import request from '@/utils/request'
// import qs from 'qs'
// import store from '@/store'
// 新增或更新菜单
export const saveOrUpdateMenu = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}
// 获取编辑菜单信息
export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}
// 获取菜单列表
export const getMenuList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}
// 删除菜单
export const delMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
