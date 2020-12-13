import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '', // 设置为空，是默认子路由，外层 path 是什么，它就是什么
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert/advertOperate',
        name: 'advertOperate',
        component: () => import(/* webpackChunkName: 'advertOperate' */ '@/views/advert/advertOperate.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      },
      {
        path: '/advert-space/create',
        name: 'advert-space-create',
        component: () => import(/* webpackChunkName: 'advert-space-create' */ '@/views/advert-space/createOrEdit.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/update',
        name: 'menu-update',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/update.vue')
      },
      {
        path: '/resource/resourceTypeList',
        name: 'resource-type-list',
        component: () => import(/* webpackChunkName: 'resource-type-list' */ '@/views/resource/components/ResourceType/ResourceTypeList.vue')
      },
      {
        path: 'role/:roleId/alloc-menu',
        name: 'alloc-role',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/role/alloc-role.vue'),
        props: true // 将路由路径参数映射到组件的 props 数据中
      },
      {
        path: 'course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/components/createOrEdit.vue')
      },
      {
        path: 'course/:courseId/:courseName/course-section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/components/CourseSection.vue'),
        props: true
      },
      {
        path: 'course/:courseId/course-video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/components/CourseVideo.vue'),
        props: true
      }
    ]
  },
  // 路由从上到下匹配，如果都不符合，就走到 *；目前这个 * 路由匹配可以放置任意位置，不一定要在最后，也不会拦截之后的路由信息
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(recorde => recorde.meta.requiresAuth)) {
    if (!store.state.user) {
      // 如没有登录状态、跳转登录页面
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
  // next ()
})
export default router
