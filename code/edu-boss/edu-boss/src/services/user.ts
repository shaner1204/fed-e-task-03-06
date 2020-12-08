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
