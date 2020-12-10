// 菜单模块
import request from '@/utils/request'
// import qs from 'qs'
// import store from '@/store'
// 新增或更新资源
export const saveOrUpdateResource = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
// 获取编辑资源信息
export const getEditResourceInfo = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`,
    params: {
      id
    }
  })
}
// 按条件分页查询资源
export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}
// 获取资源列表
export const getResourceList = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}
// 删除资源
export const delResource = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}
// 获取资源分类列表
export const resourceCategoryAll = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
// 保存或更新资源分类
export const resourceCategory = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}
// 删除资源分类
export const delResourceCategory = (id: number) => {
  return request({
    method: 'POST',
    url: `/boss/resource/category/${id}`
  })
}
