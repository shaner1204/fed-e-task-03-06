<template>
  <div class="menu-update">
    <create-or-update :isCreate="isCreate"></create-or-update>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'
export default Vue.extend({
  name: 'MenuUpdate',
  data () {
    return {
      isCreate: false
    }
  },
  components: {
    CreateOrUpdate
  }
})
</script>

<style lang="scss" scoped>
</style>
