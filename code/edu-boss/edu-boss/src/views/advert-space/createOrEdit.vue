<template>
  <div class="advert-space">
    <el-form>
        <el-form-item label="广告位名称">
            <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateSpace, getSpaceById } from '@/services/advert'
export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      name: '',
      id: this.$route.query.id ? this.$route.query.id : ''
    }
  },
  created () {
    console.log(this.$route.query.id)
    if (this.id) {
      this.loadGetSpaceId()
    }
  },
  methods: {
    async loadGetSpaceId () {
      const { data } = await getSpaceById(this.id)
      if (data.state === 1) {
        console.log(data, 'data========')
        this.name = data.content.name
      } else {
        this.$message.warning(data.message)
      }
    },
    async onSubmit () {
      const { data } = await saveOrUpdateSpace({
        name: this.name
      })
      console.log(data, '广告位新增成功了吗？？？？？')
      if (data.state === 1) {
        this.$router.push({
          name: 'advert-space'
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
