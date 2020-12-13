<template>
    <div class="aside">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select ="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
            <div v-for="(item, index) in menus" :key="index">
                <el-submenu :index="item.path" v-if="item.child">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.name}}</span>
                    </template>
                    <el-menu-item :index="subItem.path" v-for="(subItem, index) in item.child" :key="index">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{subItem.name}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item :index="item.path" v-if="!item.child">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AppAside',
  data () {
    return {
      indexBreadcrumbs: [],
      menus: [{
        name: '权限管理',
        path: '#',
        child: [{
          name: '角色管理',
          path: '/role'
        }, {
          name: '菜单管理',
          path: '/menu'
        }, {
          name: '资源管理',
          path: '/resource'
        }]
      }, {
        name: '课程管理',
        path: '/course'
      }, {
        name: '用户管理',
        path: '/user'
      }, {
        name: '广告管理',
        path: '#1',
        child: [{
          name: '广告列表',
          path: '/advert'
        }, {
          name: '广告位列表',
          path: '/advert-space'
        }]
      }]
    }
  },
  watch: {
    $route () {
      this.handleChange()
    }
  },
  computed: {
    breadcrumbList () {
      const breadcrumbs = [] as any
      let menuLists = this.menus
      this.indexBreadcrumbs.map(item => {
        for (let i = 0; i < menuLists.length; i++) {
          if (item === menuLists[i].path) {
            breadcrumbs.push(menuLists[i])
            if (menuLists[i].child) {
              menuLists = menuLists[i].child
            }
            break
          }
        }
      })
      return breadcrumbs
    }
  },
  created () {
    this.handleChange()
  },
  methods: {
    handleChange () {
      this.$store.commit('setBreadCrumbs', this.breadcrumbList)
    },
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
    handleSelect (index: string, keyPath: never) {
      this.indexBreadcrumbs = keyPath
    }
  }
})
</script>
<style lang="scss" scoped>
.aside {
    .el-menu {
        min-height: 100vh;
    }
}
</style>
