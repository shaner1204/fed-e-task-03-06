import request from '@/utils/request'
import qs from 'qs'
// import store from '@/store'

interface User {
  phone: string
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}
// 获取用户菜单和资源权限列表
export const getUserPermissions = () => {
  return request({
    method: 'GET',
    url: '/boss/permission/getUserPermissions'
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}
// 分页查询用户信息
export const getUserPages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
// 启用用户
export const enableUser = (id: number | string) => {
  return request({
    method: 'GET',
    url: `/boss/user/enableUser/${id}`
  })
}
// 封禁用户
export const disUser = (id: number | string) => {
  return request({
    method: 'GET',
    url: `/boss/user/forbidUser/${id}`
  })
}
// 查询用户角色
export const searchUserRole = (userId: number | string) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
