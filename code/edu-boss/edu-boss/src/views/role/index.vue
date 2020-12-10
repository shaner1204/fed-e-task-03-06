<template>
  <div class="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button class="login-btn" @click="addRole">添加角色</el-button>
      </div>
      <role-list
      :dialogVisible='dialogVisible'
      @dialogVisibleEmit = 'dialogVisibleEmitFn'></role-list>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import roleList from './components/list.vue'
export default Vue.extend({
  name: 'RoleIndex',
  data () {
    return {
      dialogVisible: false
    }
  },
  components: {
    roleList
  },
  methods: {
    addRole () {
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
