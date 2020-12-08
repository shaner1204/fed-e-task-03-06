import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({
  // 配置选项
  // baseuURL
  // timeout
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 可以在这里通过改写 config 配置信息来实现业务功能的统一处理
  // 注意：这里一定要返回 config，否则请求就发不出去了
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
let isRefreshing = false // 控制刷新 token 的状态
let requests: any[] = [] // 存储刷新 token 期间过来的 401 请求
request.interceptors.response.use(function (response) { // 状态码为 2XX 都会进入这里
  // 后台自定义错误状态码
  return response
}, async function (error) { // 超出 2XX 状态码都执行这里
  // HTTP 返回的错误状态码
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了 2XX 范围
    // 400 请求参数错误
    // 401 （token 失效：// token 不存在；// token 存在但是无效；// token 过期了）
    // 403  无权限
    // 404  请求资源不存在
    // 500  服务器错误
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // Message.error('token 失效')
      // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
      // 如果没有，则直接跳转登录页面
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 刷新 token
      if (!isRefreshing) {
        isRefreshing = true
        // 尝试刷新获取新的 token
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          }
          // 刷新 token 成功
          store.commit('setUser', res.data.content)
          // 把 requests 队列中的请求重新发出去
          requests.forEach(cb => cb())
          // 重置 requests 数组
          requests = []
          return request(error.config)
        }).catch(err => {
          console.log(err)
          // 把当前用户状态清除
          store.commit('setUser', null)
          // 失败了 --> 跳转登录页面重新登录获取新的 token
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false // 重置刷新状态
        })
      }
      // 刷新状态下，把请求挂起放到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
      // try {
      //   // 成功了 --> 把本次失败的请求重新发出去
      //   const { data } = await axios.create()({
      //     method: 'POST',
      //     url: '/front/user/refresh_token',
      //     data: qs.stringify({
      //       refreshtoken: store.state.user.refresh_token
      //     })
      //   })
      //   store.commit('setUser', data.content)
      //   console.log(data, '-----refresh----token')
      //   return request(error.config)
      // } catch {
      //   // 把当前用户状态清除
      //   store.commit('setUser', null)
      //   // 失败了 --> 跳转登录页面重新登录获取新的 token
      //   redirectLogin()
      //   return Promise.reject(error)
      // }
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('访问的资源不存在')
    } else if (status >= 500) {
      Message.error('服务器错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请重新重试')
    // console.log(error.request);
  } else { // 在设置请求时发生一些事情，触发了一个错误
    // Something happened in setting up the request that triggered an Error
    Message.error(`请求失败：${error.message}`)
    // console.log('Error', error.message);
  }
  // 把请失败的错误对象继续抛出，扔给上一个调用者
  return Promise.reject(error)
})
export default request
