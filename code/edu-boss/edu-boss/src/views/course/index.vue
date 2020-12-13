<template>
  <div class="advert">
    <el-row>
      <el-col :span="18">
        <el-form
          :model="form"
          ref="form"
          label-width="80px"
          :inline="true"
          class="filter-form"
          >
          <el-form-item label="课程名称">
              <el-input v-model="form.courseName" placeholder="输入课程名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
              <el-select v-model="form.status">
              <el-option  label = "全部" value=""></el-option>
              <el-option label = "上架" :value=1></el-option>
              <el-option label = "下架" :value=0></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="onSubmit" :disabled="isloading">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" :disabled="isloading" @click="$router.push({name: 'course-create'})">添加课程</el-button>
      </el-col>
    </el-row>
    <el-table
        v-loading="isloading"
        :data="courseList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column><el-table-column
          prop="courseName"
          label="课程名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <div class = 'status-circle' :class="scope.row.status === 0 ? 'disStatus' : 'enabledStatus'"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.status === 0 ? 'success' : 'danger'"
              @click="courseStatus(scope.row)">{{scope.row.status === 0 ? '上架' : '下架'}}</el-button>
            <el-button
              size="mini"
              @click="$router.push({name: 'course-create', params: {
                id: scope.row.id
              }})">编辑</el-button>
            <el-button
              size="mini"
              @click="$router.push({name: 'course-section', params: {
                courseId: scope.row.id,
                courseName: scope.row.courseName
              }})">内容管理</el-button>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
export default Vue.extend({
  name: 'CourseIndex',
  data () {
    return {
      isloading: false,
      courseList: [],
      form: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: '',
        total: 0
      }
    }
  },
  created () {
    this.loadQueryCourse()
  },
  methods: {
    async loadQueryCourse () {
      this.isloading = true
      const { data } = await getQueryCourses(this.form)
      console.log(data, 'data')
      if (data.code === '000000') {
        this.isloading = false
        this.courseList = data.data.records
        this.form.currentPage = data.data.current
        this.form.total = data.data.total
      }
    },
    async courseStatus (item: any) {
      const obj = {
        courseId: item.id,
        status: item.status === 0 ? 1 : 0
      }
      // const { data } = await changeState(item.id, item.status === 0 ? 1 : 0)
      const { data } = await changeState(obj)
      if (data.code === '000000') {
        this.loadQueryCourse()
      }
    },
    handleSizeChange (val: number) {
      console.log(val)
      this.form.pageSize = val
      this.loadQueryCourse()
    },
    handleCurrentChange (val: number) {
      console.log(val)
      this.form.currentPage = val
      this.loadQueryCourse()
    },
    onSubmit () {
      this.form.currentPage = 1
      this.loadQueryCourse()
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
