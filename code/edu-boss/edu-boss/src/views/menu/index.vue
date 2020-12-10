<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button class="login-btn" @click="$router.push({name: 'menu-create'})">添加菜单</el-button>
      </div>
      <el-table
        :data="menus"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="80">
        </el-table-column><el-table-column
          prop="name"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
          width="180">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
        <el-table-column
          label="操作"
          width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { delMenu, getMenuList } from '@/services/menu'
export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadMenuList()
  },
  methods: {
    async loadMenuList () {
      const { data } = await getMenuList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'menu-update',
        params: {
          id: item.id
        }
      })
    },
    handleDelete (item: any) {
      this.$confirm('是否要删除该菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await delMenu(item.id)
        if (data.code === '000000') {
          this.$message('删除成功')
          this.loadMenuList()
        }
      }).catch(() => {
        this.$message('已取消删除')
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
