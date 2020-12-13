<template>
  <div class="text-editor" ref="editor">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadImg } from '@/services/course'
export default Vue.extend({
  name: 'TextEditorIndex',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initEditor()
  },
  components: {
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      // 注意：事件监听必须在 create 之前
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.create()
      // 注意：设置初始值必须在 create 之后
      editor.txt.html(this.value)
      editor.config.customUploadImg = async function (resultFile: any, insertImgFn: any) {
        // 1、把用户选择的 resultFile 上传到服务端
        const fd = new FormData()
        fd.append('file', resultFile[0])
        const { data } = await uploadImg(fd)
        insertImgFn(data.data.name)
        // insertImgFn('图片地址') // 根据图片地址生成 img 标签插入富文本编辑器中
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
