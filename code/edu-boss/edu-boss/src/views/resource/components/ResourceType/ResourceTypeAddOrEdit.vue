<template>
  <div class="resource-operate">
      <el-dialog
        :title="isUpdate ? '编辑资源分类' : '添加资源分类'"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form
        :model="form"
        ref="form"
        label-width="80px"
        >
            <el-form-item label="资源分类名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="form.sort"></el-input>
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
import { resourceCategory } from '@/services/resource'
export default Vue.extend({
  name: 'ResourceAddOrEdit',
  data () {
    return {
      form: {
        id: '',
        name: '',
        sort: ''
      }
    }
  },
  props: ['isUpdate', 'dialogVisible', 'updateId'],
  methods: {
    handleClose () {
      this.$emit('dialogVisibleEmit')
    },
    async onSubmit () {
      const { data } = await resourceCategory(this.form)
      if (data.code === '000000') {
        if (this.isUpdate) {
          this.$message.success('资源分类更新成功')
        } else {
          this.$message.success('资源分类添加成功')
        }
        this.handleClose()
        this.$emit('typeOperateEmit')
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
