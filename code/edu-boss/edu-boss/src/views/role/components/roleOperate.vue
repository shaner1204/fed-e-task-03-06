<template>
  <div class="resource">
      <el-dialog
        :title="isUpdate ? '编辑角色' : '添加角色'"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form
        :model="form"
        ref="form"
        label-width="80px"
        >
            <el-form-item label="角色名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="角色编码">
                <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{isUpdate? '更新' : '添加'}}</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateRole, getRoleInfo } from '@/services/role'
export default Vue.extend({
  name: 'CreateResourceIndex',
  data () {
    return {
      form: {
        name: '',
        description: '',
        code: '',
        id: ''
      }
    }
  },
  props: ['dialogVisible', 'isUpdate', 'updateId'],
  created () {
    if (this.isUpdate) {
      this.loadEditRoleInfo()
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdateRole(this.form)
      if (data.code === '000000') {
        this.handleClose()
        this.$emit('addResourceEmit')
      }
      console.log(data, '添加资源')
    },
    handleClose () {
      this.$emit('dialogEmit')
    },
    async loadEditRoleInfo () {
      const { data } = await getRoleInfo(this.updateId)
      console.log(data, '编辑资源信息-----------获取')
      this.form = data.data
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
