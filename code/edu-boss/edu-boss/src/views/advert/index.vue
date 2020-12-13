<template>
  <div class="advert">
    <el-button style="margin-bottom: 20px;" @click="$router.push({name: 'advertOperate'})">添加广告</el-button>
    <el-table
        v-loading="isloading"
        :data="adverts"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column><el-table-column
          prop="name"
          label="广告名称">
        </el-table-column>
        <el-table-column
          prop="keyword"
          label="广告位置">
        </el-table-column>
        <el-table-column
          label="广告图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" class="img">
          </template>
        </el-table-column>
        <el-table-column
          label="时间"
          width="230">
          <template slot-scope="scope">
            <div>开始时间：{{scope.row.startTimeFormatString}}</div>
            <div>到期时间：{{scope.row.endTimeFormatString}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="上线/下线">
          <template slot-scope="scope">
            {{scope.row.status}}
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="$router.push({name: 'advertOperate', params: {
                id: scope.row.id
              }})">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdList } from '@/services/advert'
export default Vue.extend({
  name: 'AdvertIndex',
  data () {
    return {
      adverts: [],
      isloading: true
    }
  },
  created () {
    this.loadAdverts()
  },
  methods: {
    async loadAdverts () {
      const { data } = await getAdList()
      if (data.state === 1) {
        this.isloading = false
        this.adverts = data.content
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.img {
  display: block;
  width: 100px;
  height: 50px;
}
</style>
