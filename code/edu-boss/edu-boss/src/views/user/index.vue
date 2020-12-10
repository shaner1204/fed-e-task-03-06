<template>
  <div class="user">
    <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="true"
        class="filter-form"
        >
        <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始日期" v-model="form.startCreateTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker placeholder="结束日期" v-model="form.endCreateTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isloading">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table
        v-loading="isloading"
        :data="users"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用户ID"
          width="80">
        </el-table-column><el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <div class = 'status-circle' :class="scope.row.status === 'DISABLE' ? 'disStatus' : 'enabledStatus'"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type='text'
              @click="handleDisabled(scope.row)">{{scope.row.status === 'DISABLE' ? '启用' : '禁用'}}</el-button>
            <el-button
              size="mini"
              type='text' @click="setRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
    :disabled="isloading"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="form.currentPage"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="form.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="form.total">
    </el-pagination>
    <el-dialog
        title='分配角色'
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form
        :model="form"
        ref="form"
        label-width="80px"
        >
            <el-form-item>
                <el-select v-model="roleIds" placeholder="请选择角色" multiple="">
                <el-option
                    :label=item.name
                    :value=item.id
                    v-for="(item, index) in roleList"
                    :key = index></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="setRoleOnSubmit">确定</el-button>
            </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span> -->
        </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, disUser, enableUser, searchUserRole } from '@/services/user'
import { getAllRoleList, allocateRoleMenus } from '@/services/role'
export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      users: [],
      isloading: false,
      dialogVisible: false,
      roleList: [],
      roleIds: [],
      userIdSetRole: '',
      form: {
        currentPage: 0,
        pageSize: 10,
        phone: '',
        userId: 0,
        startCreateTime: '',
        endCreateTime: '',
        total: 0
      }
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    async loadUsers () {
      const { data } = await getUserPages(this.form)
      if (data.code === '000000') {
        this.users = data.data.records
        this.form.total = data.data.total
        this.form.currentPage = data.data.current
      }
      console.log(data, 'data----user')
    },
    handleSizeChange (val: number) {
      console.log(val)
      this.form.pageSize = val
      this.loadUsers()
    },
    handleCurrentChange (val: number) {
      console.log(val)
      this.form.currentPage = val
      this.loadUsers()
    },
    async handleDisabled (item: any) {
      if (item.status === 'DISABLE') {
        const { data } = await enableUser(item.id)
        this.$confirm('确定要启用该用户吗？', '提示').then(() => {
          if (data.code === '000000') {
            this.$message.success('该用户已启用')
            this.loadUsers()
          } else {
            this.$message(data.data)
          }
        }).catch(() => {
          this.$message('取消禁用')
        })
      } else if (item.status === 'ENABLE') {
        const { data } = await disUser(item.id)
        this.$confirm('确定要禁用该用户吗？', '提示').then(() => {
          if (data.code === '000000') {
            this.$message.success('该用户已禁用')
            this.loadUsers()
          } else {
            this.$message(data.data)
          }
        }).catch(() => {
          this.$message('取消禁用')
        })
      }
    },
    onSubmit () {
      this.loadUsers()
      console.log('查询')
    },
    async setRole (item: any) {
      this.userIdSetRole = item.id
      this.dialogVisible = !this.dialogVisible
      const { data } = await getAllRoleList()
      if (data.code === '000000') {
        this.roleList = data.data
      }
      const { roleData } = await searchUserRole(item.id) as any
      console.log(roleData, '获取用户角色')
    },
    handleClose () {
      this.dialogVisible = false
    },
    async setRoleOnSubmit () {
      const obj = {
        userId: this.userIdSetRole,
        roleIdList: this.roleIds
      }
      const { data } = await allocateRoleMenus(obj)
      if (data.code === '000000') {
        console.log('成功')
        this.dialogVisible = false
        this.loadUsers()
      } else {
        this.$message(data.mesg)
        this.dialogVisible = false
      }
      console.log(data, 'data')
    }
  }
})
</script>

<style lang="scss" scoped>
.status-circle {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  &.disStatus {
    background: red;
  }
  &.enabledStatus {
    background: green;
  }
}
</style>
