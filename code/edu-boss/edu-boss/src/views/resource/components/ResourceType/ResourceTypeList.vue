<template>
  <div class="resource-type">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click='addType'>添加</el-button>
      </div>
      <el-table
        :data="resourceTypes"
        style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          width="80">
        </el-table-column><el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序">
        </el-table-column>
        <el-table-column
          label="操作"
          width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              disabled>编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <type-operate
      v-if='dialogVisible'
      :dialogVisible="dialogVisible"
      :isUpdate="isUpdate"
      :updateId='updateId'
      @dialogVisibleEmit='dialogVisibleEmitFn'
      @typeOperateEmit='typeOperateEmitFn'
      ></type-operate>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { resourceCategoryAll, delResourceCategory } from '@/services/resource'
import typeOperate from './ResourceTypeAddOrEdit.vue'
export default Vue.extend({
  name: 'ResourceTypeIndex',
  data () {
    return {
      resourceTypes: [],
      dialogVisible: false,
      isUpdate: false,
      updateId: ''
    }
  },
  created () {
    this.loadResourceCategory()
  },
  methods: {
    // 资源分类列表
    async loadResourceCategory () {
      const { data } = await resourceCategoryAll()
      if (data.code === '000000') {
        this.resourceTypes = data.data
      }
    },
    addType () {
      this.dialogVisible = true
    },
    dialogVisibleEmitFn () {
      this.dialogVisible = !this.dialogVisibleEmitFn
    },
    typeOperateEmitFn () {
      this.loadResourceCategory()
    },
    handleEdit (item: any) {
      this.isUpdate = true
      this.updateId = item.id
      this.dialogVisible = true
    },
    handleDelete (item: any) {
      this.$confirm('确认删除该分类吗？').then(async () => {
        const { data } = await delResourceCategory(item.id)
        console.log(data, 'dddddddddddd')
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadResourceCategory()
        }
      }).catch(() => {
        this.$message('取消删除')
      })
    }
  },
  components: {
    typeOperate
  }
})
</script>

<style lang="scss" scoped></style>
