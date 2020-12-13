<template>
  <div class="course-video">
    <el-card>
        <div slot="header">
            <div>课程：7777</div>
            <div>阶段：888</div>
            <div>课时：7777</div>
        </div>
        <el-form>
            <el-form-item label="视频上传">
                <input type="file" ref="videoFile">
            </el-form-item>
            <el-form-item label="封面上传">
                <input type="file" ref="imageFile">
            </el-form-item>
            <div>
                视频上传进度：{{uploadPercent}}%
                <p>视频转码中：{{isTransCodeSuccess ? '完成' : '正在处理，请稍后'}}</p>
            </div>
            <el-form-item>
                <el-button type="primary" @click="handleUpload">开始上传</el-button>
                <el-button>返回</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAliyunImagUploadAddressAdnAuth,
  getAliyunVideoUploadAddressAdnAuth,
  aliyunTransCode,
  aliyunTransCodePercent
} from '@/services/upload'
export default Vue.extend({
  name: 'CourseVideoIndex',
  data () {
    return {
      uploader: null,
      imageUrl: '',
      videoId: '',
      uploadPercent: 0,
      isTransCodeSuccess: false,
      isUploadSuccess: false
    }
  },
  created () {
    this.initUploader()
  },
  computed: {
    video () {
      return this.$refs.videoFile
    },
    image () {
      return this.$refs.imageFile
    }
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值
        userId: '1618139964448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          console.log('onUploadstarted', uploadInfo)
          let uploadAdressAndAuth
          // 通过我们的后端获取文件上传凭证
          if (uploadInfo.isImage) {
            // 获取图片上传凭证
            const { data } = await getAliyunImagUploadAddressAdnAuth()
            this.imageUrl = data.data.imageURL
            uploadAdressAndAuth = data.data
          } else {
            // 获取视频上传凭证
            console.log(this.imageUrl, 'imageurl')
            const { data } = await getAliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl
            })
            uploadAdressAndAuth = data.data
            this.videoId = data.data.videoId
          }
          // 调用 uploader.setUploadAuthAndAddress 设置上传凭证
          console.log(uploadAdressAndAuth, '获取凭证返回')
          ;(this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAdressAndAuth.uploadAuth,
            uploadAdressAndAuth.uploadAddress,
            uploadAdressAndAuth.imageId || uploadAdressAndAuth.videoId
          )
          // setUploadAuthAndAddress(uploadFileInfo, uploadAuth, uploadAddress,videoId)
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed', uploadInfo, code, message)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
          console.log('onUploadProgress', uploadInfo, totalSize, loadedPercent)
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(loadedPercent * 100)
            console.log(this.uploadPercent, '&%%%%%%%%%%%%%%%%%')
          }
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log('onUploadTokenExpired', uploadInfo)
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          this.isUploadSuccess = true
          console.log('onUploadEnd', uploadInfo)
          // 请求转码
          const { data } = await aliyunTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: this.imageUrl,
            fileName: (this.video as any).files[0].name,
            filed: this.videoId
          })
          console.log(data, '请求转码-------------')
          // 轮询转码进度
        //   const timer = setInterval(async () => {
        //     const { data } = await aliyunTransCodePercent(this.$route.query.lessonId)
        //     console.log(data, 'data-----------转码进度')
        //     this.uploadPercent = data.data
        //     if (data.data === 100) {
        //       this.isTransCodeSuccess = true
        //       window.clearInterval(timer)
        //       console.log('转码成功')
        //     }
        //   }, 3000)
        }
      })
    },
    handleUpload () {
      // 初始化上传状态
      this.isUploadSuccess = false
      this.isTransCodeSuccess = false
      this.uploadPercent = 0
      // 获取上传文件
      const videofile = (this.video as any).files[0]
      const imagefile = (this.image as any).files[0]
      const uploader = this.uploader as any
      console.log(videofile, imagefile)
      // 将用户所选的文件添加到上传列表中
      // 一旦开始上传，它就会按照列表中添加的顺序开始上传
      uploader.addFile(imagefile, null, null, null, '{"vod":{}}')
      uploader.addFile(videofile, null, null, null, '{"vod":{}}')
      // 开始上传
      uploader.startUpload()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
