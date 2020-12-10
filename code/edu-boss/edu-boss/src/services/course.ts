// 菜单模块
import request from '@/utils/request'
// import qs from 'qs'
// import store from '@/store'
// 分页查询课程
export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
