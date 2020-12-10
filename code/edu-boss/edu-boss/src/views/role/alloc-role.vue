<template>
  <div class="user">
    <el-tree
    node-key="id"
    :data="menus"
    :props="defaultProps"
    :default-checked-keys="[20]"
    show-checkbox
    default-expand-all
    ref='alloc-menu'></el-tree>
    <div class="btns">
      {{checkedKeys}}
        <el-button>清空</el-button>
        <el-button type="primary" @click="saveMenu">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/role'
import { Tree } from 'element-ui'
export default Vue.extend({
  name: 'AllocRole',
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      menuList: [],
      checkedKeys: []
    }
  },
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.loadMenuNodeList()
    this.loadRoleMenus()
  },
  methods: {
    async loadRoleMenus () {
      console.log(this.roleId, 'roleid')
      const { data } = await getRoleMenus(this.roleId)
      console.log(data, '加载角色菜单')
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        console.log(menu.selected, 'menu')
        if (menu.selected) {
          console.log(menu.id, 'id------------------id')
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
          // this.checkedKeys.push(menu.id as never)
        }
        if (menu.subMenuList) {
          console.log(menu.subMenuList, 'submenulist')
          this.getCheckedKeys(menu.subMenuList)
        }
      })
      console.log(this.checkedKeys, 'checkedKeys00000000000')
    },
    async loadMenuNodeList () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async saveMenu () {
      const menuList = (this.$refs['alloc-menu'] as Tree).getCheckedKeys()
      console.log(menuList, 'menulist')
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuList
      })
      if (data.code === '000000') {
        this.$router.back()
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
