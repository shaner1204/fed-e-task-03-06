<template>
  <div id="app">
    <!-- 根级路由出口 -->
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import request from '@/utils/request'
// request({
//   method: 'GET',
//   url: '/v2/api-docs?group=edu-boss-boot'
// }).then(res => {
//   console.log(res, 'res==========')
// })
export default Vue.extend({
  data () {
    return {
      a: 1,
      b: '2',
      c: []
    }
  },
  methods: {
  }
})
</script>
<!--<script>
// 编辑器给的类型提示
// TS 编译期间的类型验证
export default {
  data () {
    return {
      a: 1,
      b: '2',
      c: []
    }
  },
  methods: {
    test () {
      this.a.
    }
  }
}
</script>-->
<style lang="scss" scoped>
// @import "@/styles/variables.scss";
// .test {
//   color: $success-color;
// }
</style>
