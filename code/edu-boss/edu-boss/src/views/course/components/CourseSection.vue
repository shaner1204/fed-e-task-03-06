<template>
  <div class="course-section">
    <el-card class="box-card">
      <div slot="header" class="header">
        课程名称：{{this.$route.params.courseName}}
        <el-button type="primary" @click='addSection'>添加课程阶段</el-button>
      </div>
      <div>
        <el-tree
          :data="sections"
          :props="defaultProps"
          draggable
          :allow-drop="handleAllowDrop"
          @node-drop="handleSort">
          <span class="inner" slot-scope="{ node, data}">
            <span>{{ node.label }}</span>
            <span class="btn-section" v-if="data.lessonDTOS">
              <el-button
                size="mini"
                @click="() => editSection(data)">
                编辑
              </el-button>
              <el-button
                size="mini"
                @click="() => addLesson(data)">
                添加课时
              </el-button>
              <el-select v-model="data.status" size="mini" class="status-select" @change="statusClick(data)">
                <el-option label="隐藏" :value="0"></el-option>
                <el-option label="待更新" :value="1"></el-option>
                <el-option label="已发布" :value="2"></el-option>
              </el-select>
            </span>
            <!-- 课时 -->
            <span v-else>
              <el-button
                size="mini"
                @click="() => editLesson(data)">
                编辑
              </el-button>
              <el-button
                size="mini"
                type="success"
                @click="$router.push({
                  name: 'course-video',
                  params: {
                    courseId
                  },
                  query: {
                    sectionId: node.parent.id,
                    lessonId: data.id
                  }
                })">
                上传视频
              </el-button>
              <el-select v-model="data.status" size="mini" class="status-select" @change="lessonStatusClick(data)">
                <el-option label="隐藏" :value="0"></el-option>
                <el-option label="待更新" :value="1"></el-option>
                <el-option label="已发布" :value="2"></el-option>
              </el-select>
            </span>
          </span>
        </el-tree>
      </div>
    </el-card>
    <!-- 添加课程阶段 -->
    <el-dialog
      title="添加课程阶段"
      :visible.sync="dialogVisibleSection"
      width="30%"
      :before-close="handleClose">
      <el-form
      :model="form"
      ref="form"
      label-width="80px"
      >
          <el-form-item label="课程名称">
              <el-input v-model="form.courseName" disabled></el-input>
          </el-form-item>
          <el-form-item label="章节名称">
              <el-input v-model="form.sectionName"></el-input>
          </el-form-item>
          <el-form-item label="章节描述">
              <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="章节排序">
              <el-input-number v-model="form.orderNum"></el-input-number>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="sectionOnSubmit">确定</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加课时 -->
    <el-dialog
      title="课时基本信息"
      :visible.sync="lessonDialog"
      width="30%"
      :before-close="lessonHandleClose">
      <el-form
      :model="lessonForm"
      ref="form"
      label-width="80px"
      >
          <el-form-item label="课程名称">
              <el-input v-model="this.$route.params.courseName" disabled></el-input>
          </el-form-item>
          <el-form-item label="章节名称">
              <el-input v-model="lessonForm.sectionName" disabled></el-input>
          </el-form-item>
          <el-form-item label="课时名称">
              <el-input v-model="lessonForm.theme"></el-input>
          </el-form-item>
          <el-form-item label="时长">
              <el-input-number v-model="lessonForm.duration">
                <template slot="append">分钟</template>
              </el-input-number>
          </el-form-item>
          <el-form-item label="是否开放试听">
              <el-switch
                v-model="lessonForm.isFree"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
          </el-form-item>
          <el-form-item label="课时排序">
              <el-input-number v-model="lessonForm.orderNum"></el-input-number>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="lessonOnSubmit">确定</el-button>
          </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLesson, getBySectionId, getByIdLesson } from '@/services/course'
export default Vue.extend({
  name: 'CourseSection',
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data: any) {
          return data.sectionName || data.theme
        }
      },
      dialogVisibleSection: false,
      form: {
        id: '',
        courseId: this.$route.params.courseId,
        courseName: this.$route.params.courseName,
        sectionName: '',
        description: '',
        orderNum: '',
        status: 0
      },
      lessonForm: {
        id: '',
        courseId: '',
        sectionId: '',
        theme: '',
        duration: '',
        isFree: true,
        orderNum: '',
        status: 0,
        sectionName: ''
      },
      lessonDialog: false
    }
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.loadGetSectionAndLesson()
  },
  methods: {
    async loadGetSectionAndLesson () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    },
    async sectionOnSubmit () {
      console.log(this.form, 'form---------更新了吗？？？？？？？？？？')
      const { data } = await saveOrUpdateSection(this.form)
      if (data.code === '000000') {
        this.dialogVisibleSection = false
        this.loadGetSectionAndLesson()
      }
    },
    addSection () {
      this.form.sectionName = ''
      this.form.description = ''
      this.form.orderNum = ''
      this.dialogVisibleSection = !this.dialogVisibleSection
    },
    handleClose () {
      this.dialogVisibleSection = false
    },
    editSection (data: any) {
      console.log('编辑阶段')
      this.form = data
      this.form.courseName = this.$route.params.courseName
      this.dialogVisibleSection = true
    },
    statusClick (item: any) {
      this.form = item
      this.sectionOnSubmit()
    },
    lessonStatusClick (item: any) {
      console.log(item)
      this.lessonForm = item
      this.lessonOnSubmit()
    },
    async addLesson (item: any) {
      this.lessonForm.theme = ''
      this.lessonForm.duration = ''
      this.lessonForm.orderNum = ''
      this.lessonDialog = true
      this.getBySectionId(item)
    },
    async getBySectionId (sectionData: any) {
      const { data } = await getBySectionId(sectionData.sectionId)
      if (data.code === '000000') {
        this.lessonForm.courseId = this.$route.params.courseId
        this.lessonForm.sectionId = sectionData.sectionId
        this.$set(this.lessonForm, 'sectionName', data.data.sectionName)
        // this.lessonForm.sectionName = data.data.sectionName
      }
    },
    lessonHandleClose () {
      this.lessonDialog = false
    },
    async editLesson (item: any) {
      const { data } = await getByIdLesson(item.id)
      if (data.code === '000000') {
        this.lessonForm = data.data
      }
      this.getBySectionId(item)
      console.log(this.lessonForm, 'lessonForm==============')
      this.lessonDialog = true
    },
    async lessonOnSubmit () {
      const { data } = await saveOrUpdateLesson(this.lessonForm)
      if (data.code === '000000') {
        this.lessonDialog = false
        this.loadGetSectionAndLesson()
      }
    },
    // 拖拽
    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      // draggingNode 拖动的节点
      // dropNode 放置的目标节点
      // type：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
      return draggingNode.data.sectionId !== dropNode.data.sectionId && type !== 'inner'
    },
    async handleSort (dragNode: any, dropNode: any) {
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (dragNode.data.lessonDTOS) {
            // 阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            // 课时
            return saveOrUpdateLesson({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('排序成功')
      } catch (err) {
        console.log(err)
        this.$message.error('排序失败')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node__content {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.inner{
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-select {
  margin-left: 10px;
  width: 100px;
}
</style>
