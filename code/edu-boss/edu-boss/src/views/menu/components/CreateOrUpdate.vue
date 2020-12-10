<template>
  <div class="menu-create">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          {{isCreate ? '添加菜单' : '编辑菜单'}}
        </div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="菜单名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="菜单路径">
                <el-input v-model="form.href"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单">
                <el-select v-model="form.parentId" placeholder="请选择活动区域">
                    <el-option label="无上级菜单" :value=-1></el-option>
                    <el-option
                    :label=item.name
                    :value=item.id
                    v-for="(item, index) in parentMenuList"
                    :key = index
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="前端图标">
                <el-input v-model="form.icon"></el-input>
            </el-form-item>
            <el-form-item label="是否显示">
                <el-radio-group v-model="form.shown">
                <el-radio :label=true>是</el-radio>
                <el-radio :label=false>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序">
                <el-input type="textarea" v-model="form.orderNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import { Form } from 'element-ui'
import { saveOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
export default Vue.extend({
  name: 'MenuCreate',
  data () {
    return {
      form: {
        name: '',
        href: '',
        parentId: -1,
        description: '',
        icon: '',
        shown: false,
        orderNum: 0
      },
      parentMenuList: []
    //   loading: false,
    //   rules: {
    //     phone: [
    //       { required: true, message: '请输入手机号', trigger: 'blur' },
    //       { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
    //     ],
    //     password: [
    //       { required: true, message: '请输入密码', trigger: 'blur' },
    //       { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
    //     ]
    //   }
    }
  },
  props: ['isCreate'],
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      console.log(this.$route.query.id, '路由')
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      console.log(data, '上级菜单')
      if (data.code === '000000') {
        if (!this.isCreate) {
          this.form = data.data.menuInfo
        }
        this.parentMenuList = data.data.parentMenuList
      }
    },
    async onSubmit () {
      const { data } = await saveOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message('提交成功')
        this.$router.back()
      }
      console.log(data, '添加菜单===========')
    //   try {
    //     // 表单验证
    //     await (this.$refs.form as Form).validate()
    //     // 验证通过，发送请求
    //     this.loading = true
    //     // const { data } = await request({
    //     //   method: 'POST',
    //     //   url: '/front/user/login',
    //     //   data: qs.stringify(this.form) // axios 默认发送的是 application/json 格式的数据
    //     // })
    //     const { data } = await login(this.form)
    //     console.log(data)
    //     if (data.state !== 1) {
    //       this.$message.error(data.message)
    //     } else {
    //       // 登录成功，记录登录状态
    //       this.$store.commit('setUser', data.content)
    //       this.$message.success('登录成功')
    //       this.$router.push(this.$route.query.redirect as string || '/')
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }
    //   this.loading = false
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
