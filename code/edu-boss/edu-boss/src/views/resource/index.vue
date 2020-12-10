<template>
  <div class="resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button class="login-btn" @click="addResource">添加</el-button>
        <el-button class="login-btn" @click="$router.push({name: 'resource-type-list'})">资源分类</el-button>
      </div>
      <resource-list
      :dialogVisible='dialogVisible'
      @dialogVisibleEmit = 'dialogVisibleEmitFn'></resource-list>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import resourceList from './components/list.vue'
export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      resources: [],
      dialogVisible: false
    }
  },
  components: {
    resourceList
  },
  methods: {
    addResource () {
      this.dialogVisible = !this.dialogVisible
    },
    dialogVisibleEmitFn () {
      this.dialogVisible = !this.dialogVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.resource {
  .el-card {
    border-radius: 0;
    border: none;
    box-shadow: none;
  }
}
</style>
