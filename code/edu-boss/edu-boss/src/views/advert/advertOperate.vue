<template>
  <div class="advert-space">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="广告名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告位置">
            <el-select v-model="form.spaceId" placeholder="请选择活动区域">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in advertSpaces" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.createTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线">
            <el-radio-group v-model="form.status">
            <el-radio :label="0">下线</el-radio>
            <el-radio :label="1">上线</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="广告图片">
            <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.img" :src="form.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="广告链接">
            <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="广告备注">
            <el-input type="textarea" v-model="form.text"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateAdList, getAllSpaces, getAdvertById } from '@/services/advert'
export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      form: {
        name: '',
        spaceId: '',
        createTime: '',
        endTime: '',
        status: 0,
        img: 'https://edu-lagou.oss-cn-beijing.aliyuncs.com/images/2020/07/17/15949658736951644.jpeg',
        link: '',
        text: ''
      },
      disabled: false,
      advertSpaces: [],
      advertId: this.$route.params.id ? this.$route.params.id : 0
    }
  },
  created () {
    this.loadAdvertSpace()
    if (this.advertId) {
      this.getAdvertInfo()
    }
  },
  methods: {
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async getAdvertInfo () {
      const { data } = await getAdvertById(this.advertId)
      if (data.state === 1) {
        this.form = data.content
      } else {
        this.$message.error(data.message)
      }
      console.log(data, '广告信息')
    },
    async onSubmit () {
      const { data } = await saveOrUpdateAdList(this.form)
      if (data.state === 1) {
        console.log(data, 'data========')
      } else {
        this.$message.warning(data.message)
      }
    },
    handleRemove (file: any) {
      console.log(file)
    },
    async loadAdvertSpace () {
      const { data } = await getAllSpaces()
      if (data.state === 1) {
        this.advertSpaces = data.content
      }
    }
    // async onSubmit () {
    //   const { data } = await saveOrUpdateSpace({
    //     name: this.name
    //   })
    //   console.log(data, '广告位新增成功了吗？？？？？')
    //   if (data.state === 1) {
    //     this.$router.push({
    //       name: 'advert-space'
    //     })
    //   }
    // }
  }
})
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
