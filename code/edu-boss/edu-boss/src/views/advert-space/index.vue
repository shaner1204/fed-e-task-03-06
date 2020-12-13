<template>
  <div class="advert-space">
    <el-button style="margin-bottom: 20px;" @click="$router.push({name: 'advert-space-create'})">添加广告位</el-button>
    <el-table
        v-loading="isloading"
        :data="advertSpaces"
        style="width: 100%">
        <el-table-column
          prop="spaceKey"
          label="spaceKey"
          width="80">
        </el-table-column><el-table-column
          prop="name"
          label="广告位名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="$router.push({name: 'advert-space-create', query: {id: scope.row.id}})">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllSpaces } from '@/services/advert'
export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      advertSpaces: [],
      isloading: true
    }
  },
  created () {
    this.loadAdverts()
  },
  methods: {
    async loadAdverts () {
      const { data } = await getAllSpaces()
      if (data.state === 1) {
        this.isloading = false
        this.advertSpaces = data.content
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
