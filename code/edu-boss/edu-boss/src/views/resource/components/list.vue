<template>
  <div class="resource-list">
    <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="true"
        class="filter-form"
        >
        <el-form-item label="资源名称" prop="phone">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="password">
            <el-input v-model="form.url"></el-input>
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
            <el-button @click="resetFilter" :disabled="isloading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isloading">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table
        v-loading="isloading"
        :data="resources"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="80">
        </el-table-column><el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
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
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
    :disabled="isloading"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="form.current"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="form.size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="form.total">
    </el-pagination>
    <create-or-update
        v-if='dialogVisible'
        :dialogVisible="dialogVisible"
        @dialogEmit="dialogEmitFn"
        @addResourceEmit = 'addResourceEmitFn'
        :resourceTypes='resourceTypes'
        :isUpdate='isUpdate'
        :updateId='updateId'/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './CreateOrUpdateResource.vue'
import { getResourcePages, resourceCategoryAll, delResource } from '@/services/resource'
export default Vue.extend({
  name: 'ResourceListIndex',
  data () {
    return {
      resources: [],
      resourceTypes: [],
      isUpdate: false,
      updateId: '',
      isloading: false,
      form: {
        current: 1, // 当前页码
        size: 10, // 每页条数
        total: 0,
        name: '',
        url: '',
        categoryId: ''
      }
    }
  },
  props: ['dialogVisible'],
  created () {
    this.loadResourceCategory()
    this.loadResourceList()
  },
  methods: {
    //   资源列表
    async loadResourceList () {
      this.isloading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.form.current = data.data.current
        this.form.total = data.data.total
        this.isloading = false
      }
    },
    // 页码 size 变化
    handleSizeChange (val: number) {
      this.form.size = val
      this.loadResourceList()
      console.log(`每页 ${val} 条`)
    },
    // 当前页码
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResourceList()
      console.log(`当前页: ${val}`)
    },
    // 筛选查询
    onSubmit () {
      this.loadResourceList()
    },
    // 重置筛选
    resetFilter () {
      this.form.name = ''
      this.form.url = ''
      this.form.categoryId = ''
      this.loadResourceList()
    },
    dialogEmitFn () {
      console.log('自定义事件')
      this.$emit('dialogVisibleEmit')
    },
    // 资源分类列表
    async loadResourceCategory () {
      const { data } = await resourceCategoryAll()
      if (data.code === '000000') {
        this.resourceTypes = data.data
      }
    },
    addResourceEmitFn () {
      this.loadResourceList()
    },
    // 编辑资源
    handleEdit (item: any) {
      this.dialogEmitFn()
      this.isUpdate = true
      this.updateId = item.id
    },
    // 删除资源
    handleDelete (item: any) {
      this.$confirm('确认删除该资源吗？').then(async () => {
        const { data } = await delResource(item.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadResourceList()
        }
      }).catch(() => {
        this.$message('取消删除成功')
      })
    }
  },
  components: {
    CreateOrUpdate
  }
})
</script>

<style lang="scss" scoped></style>
