<template>
  <div class="course">
    <el-card>
        <div slot="header">
            <el-steps :active="activeStep" simple>
                <el-step
                    v-for='(item, index) in steps'
                    :key = "index"
                    :title="item.name"
                    icon="el-icon-edit"
                    @click.native="activeStep = index">
                </el-step>
            </el-steps>
        </div>
        <el-form label-width="80px">
            <div v-show="activeStep === 0">
                <el-form-item label="课程名称">
                    <el-input v-model="course.courseName" placeholder="输入名称"></el-input>
                </el-form-item>
                <el-form-item label="课程简介">
                    <el-input v-model="course.brief" placeholder="输入简介"></el-input>
                </el-form-item>
                <el-form-item label="讲师姓名">
                    <el-input v-model="course.teacherDTO.teacherName" placeholder="输入讲师姓名"></el-input>
                </el-form-item>
                <!-- <el-form-item label="职位">
                    <el-input v-model="form.phone" placeholder="输入职位"></el-input>
                </el-form-item> -->
                <el-form-item label="讲师简介">
                    <el-input v-model="course.teacherDTO.description" placeholder="输入讲师简介"></el-input>
                </el-form-item>
                <el-form-item label="课程概述">
                    <el-input v-model="course.previewFirstField" placeholder="概述1" type="textarea"></el-input>
                    <el-input v-model="course.previewSecondField" placeholder="概述2" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="课程排序">
                    <el-input-number v-model="course.sortNum" placeholder="输入课程排序"></el-input-number>
                </el-form-item>
            </div>
            <div v-show="activeStep === 1">
                <el-form-item label='课程封面'>
                  <!-- upload 上传文件组件，它支持自动上传，你只需要上传需要 参数 配置一下就可以了-->
                  <!-- 1、组件需要根据绑定的数据进行图片预览
                  2、组件需要把上传成功的地址同步到绑定的数据中
                  v-model 的本质还是父子组件通信
                    1、它会子组件传递一个名字叫 value 的数据
                    2、默认监听 input 事件，修改绑定的数据 -->
                    <!-- <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleUpload">
                    <img v-if="course.courseListImg" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <upload-image v-model="course.courseListImg"></upload-image>
                </el-form-item>
                <el-form-item label='解锁封面'>
                    <upload-image v-model="course.courseImgUrl"></upload-image>
                </el-form-item>
            </div>
            <div v-show="activeStep === 2">
                <el-form-item label="售卖价格">
                    <el-input v-model="activeStep">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品原价">
                    <el-input v-model="course.price">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="销量">
                    <el-input v-model="course.sales">
                        <template slot="append">单</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="活动标签">
                    <el-input v-model="course.discountsTag">
                    </el-input>
                </el-form-item>
            </div>
            <div v-show="activeStep === 3">
                <el-form-item label="限时秒杀开关">
                    <el-switch
                    v-model="course.activityCourse"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <template v-if="course.activityCourse">
                    <el-form-item label="开始时间">
                        <el-date-picker
                        type="date"
                        placeholder="开始时间"
                        v-model="course.activityCourseDTO.beginTime"
                        style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker
                        type="date"
                        placeholder="结束时间"
                        v-model="course.activityCourseDTO.endTime"
                        style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="秒杀价">
                        <el-input v-model="course.activityCourseDTO.amount">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="秒杀库存">
                        <el-input v-model="course.activityCourseDTO.stock">
                            <template slot="append">个</template>
                        </el-input>
                    </el-form-item>
                </template>
            </div>
            <div v-show="activeStep === 4">
                <el-form-item label="课程详情">
                    <text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
                    <!-- <el-input type="textarea" v-model="course.courseDescriptionMarkDown"></el-input> -->
                </el-form-item>
                <el-form-item>
                    <el-button @click="courseSubmit">保存</el-button>
                </el-form-item>
            </div>
            <el-form-item v-if='activeStep >= 0 && activeStep < 4'>
                <el-button @click="activeStep++">下一步</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
import uploadImage from './CourseImage.vue'
import textEditor from '@/components/TextEditor/index.vue'
export default Vue.extend({
  name: 'CourseCreate',
  data () {
    return {
      activeStep: 0,
      steps: [{
        name: '基本信息',
        active: 1
      }, {
        name: '课程封面',
        active: 2
      }, {
        name: '销售信息',
        active: 3
      }, {
        name: '秒杀活动',
        active: 4
      }, {
        name: '课程详情',
        active: 5
      }],
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: false,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      },
      imageUrl: ''
    }
  },
  components: {
    uploadImage,
    textEditor
  },
  created () {
    console.log(this.$route.params.id, 'id')
    if (this.$route.params.id) {
      this.loadGetCourseById()
    }
  },
  methods: {
    async loadGetCourseById () {
      const { data } = await getCourseById(this.$route.params.id)
      if (data.code === '000000') {
        console.log(data, '获取课程')
        this.course = data.data
      }
    },
    async courseSubmit () {
      const { data } = await saveOrUpdateCourse(this.course)
      console.log(data, '课程data')
      if (data.code === '000000') {
        this.$message.success('课程添加成功~')
        this.$router.back()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step__title {
    cursor: pointer;
}
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
::v-deep .avatar-uploader-icon {
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
