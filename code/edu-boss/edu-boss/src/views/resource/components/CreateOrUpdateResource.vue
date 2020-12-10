<template>
  <div class="resource">
      <el-dialog
        :title="isUpdate ? '编辑资源' : '添加资源'"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form
        :model="form"
        ref="form"
        label-width="80px"
        >
            <el-form-item label="资源名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="资源路径">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="资源分类">
                <el-select v-model="form.categoryId" placeholder="全部">
                <el-option
                    :label=item.name
                    :value=item.id
                    v-for="(item, index) in resourceTypes"
                    :key = index></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{isUpdate? '更新' : '添加'}}</el-button>
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
import { saveOrUpdateResource, getEditResourceInfo } from '@/services/resource'
export default Vue.extend({
  name: 'CreateResourceIndex',
  data () {
    return {
      form: {
        name: '',
        url: '',
        description: '',
        categoryId: '',
        id: ''
      }
    }
  },
  props: ['dialogVisible', 'resourceTypes', 'isUpdate', 'updateId'],
  created () {
    if (this.isUpdate) {
      this.loadEditResourceInfo()
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdateResource(this.form)
      if (data.code === '000000') {
        this.handleClose()
        this.$emit('addResourceEmit')
      }
      console.log(data, '添加资源')
    },
    handleClose () {
      this.$emit('dialogEmit')
    },
    async loadEditResourceInfo () {
      const { data } = await getEditResourceInfo(this.updateId)
      console.log(data, '编辑资源信息-----------获取')
      this.form = data.data
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
