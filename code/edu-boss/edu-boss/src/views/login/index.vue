<template>
  <div class="login">
    <h1 class="login-tit">Edu Boss 后台管理系统</h1>
    <el-form
      label-position="top"
      :rules="rules"
      :model="form"
      ref="form"
      label-width="80px"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-btn" :loading='loading'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user.ts'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      loading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 表单验证
        await (this.$refs.form as Form).validate()
        // 验证通过，发送请求
        this.loading = true
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login',
        //   data: qs.stringify(this.form) // axios 默认发送的是 application/json 格式的数据
        // })
        const { data } = await login(this.form)
        console.log(data)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 登录成功，记录登录状态
          this.$store.commit('setUser', data.content)
          this.$message.success('登录成功')
          this.$router.push(this.$route.query.redirect as string || '/')
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .login-tit {
    color: #7891a9;
  }
  .el-form {
    background: #fff;
    width: 300px;
    padding: 20px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
