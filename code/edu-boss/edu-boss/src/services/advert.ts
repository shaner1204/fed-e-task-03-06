import request from '@/utils/request'
// import qs from 'qs'
// import store from '@/store'
// 获取广告列表
export const getAdList = () => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}
// 新增或修改广告信息
export const saveOrUpdateAdList = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}
// 获取广告信息
export const getAdvertById = (id: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: {
      id
    }
  })
}
// 广告位列表
export const getAllSpaces = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}
// 新增或更新广告位列表
export const saveOrUpdateSpace = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}
// 获取广告位信息
export const getSpaceById = (id: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params: {
      id
    }
  })
}
