<template>
  <div class="resource-list">
    <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="true"
        class="filter-form"
        >
        <el-form-item label="输入搜索">
            <el-input v-model="form.name" placeholder="输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="resetFilter" :disabled="isloading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isloading">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table
        v-loading="isloading"
        :data="roles"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="80">
        </el-table-column><el-table-column
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type='text' @click='$router.push({name: "alloc-role", params: {roleId: scope.row.id}})'>分配菜单</el-button>
            <el-button
              size="mini"
              type='text'>分配资源</el-button>
            <el-button
              size="mini"
              type='text'
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type='text'
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <operate-wrap
        v-if='dialogVisible'
        :dialogVisible="dialogVisible"
        @dialogEmit="dialogEmitFn"
        @addResourceEmit = 'addResourceEmitFn'
        :isUpdate='isUpdate'
        :updateId='updateId'>
    </operate-wrap>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllRoleList, delRole, getRolePages } from '@/services/role'
import OperateWrap from './roleOperate.vue'
export default Vue.extend({
  name: 'RoleListIndex',
  data () {
    return {
      roles: [],
      isUpdate: false,
      updateId: '',
      isloading: false,
      form: {
        name: ''
      }
    }
  },
  props: ['dialogVisible'],
  created () {
    this.loadRoleList()
  },
  methods: {
    //   角色列表
    async loadRoleList () {
      this.isloading = true
      const { data } = await getAllRoleList()
      console.log(data, '获取所有角色')
      if (data.code === '000000') {
        this.roles = data.data
        this.isloading = false
      }
    },
    // 筛选查询
    onSubmit () {
      this.searchRoleInfo()
    },
    async searchRoleInfo () {
      const { data } = await getRolePages(this.form)
      if (data.code === '000000') {
        this.roles = data.data.records
      }
      console.log(data, '搜索列表')
    },
    // 重置筛选
    resetFilter () {
      this.form.name = ''
      this.loadRoleList()
    },
    dialogEmitFn () {
      this.$emit('dialogVisibleEmit')
    },
    addResourceEmitFn () {
      this.loadRoleList()
    },
    // 编辑角色
    handleEdit (item: any) {
      console.log(item, 'item-------edit')
      this.dialogEmitFn()
      this.isUpdate = true
      this.updateId = item.id
    },
    // 删除角色
    handleDelete (item: any) {
      this.$confirm('确认删除该角色吗？').then(async () => {
        const { data } = await delRole(item.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadRoleList()
        }
      }).catch(() => {
        this.$message('取消删除成功')
      })
    }
  },
  components: {
    OperateWrap
  }
})
</script>
<style lang="scss" scoped></style>
