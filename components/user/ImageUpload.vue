<template lang="html">
  <div>
    <div class="wrapper" @mouseenter="handleDivMouseEnter" @mouseleave="handleDivMouseLeave">
      <div class="img_change" v-show="isUpload && isImgChange">
        <!-- <label class="iconfont icon_change" title="更换" for="file">&#xe60b;</label> -->
        <span class="iconfont icon_clear" title="删除" @click.prevent="clearImg">&#xe612;</span>
      </div>

      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        :action="actionPath"
        :show-file-list="false"
        accept="image/jpeg,image/png"
        :before-upload="beforeAvatarUpload"
        :data="postData"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" :alt="imageAlt" class="avatar">
        <!-- <i v-else class="el-icon-upload"></i> -->
        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { genUpToken } from '@/assets/styles/qiniuToken'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ImageUpload',
  data() {
    return {
      isUpload: false,
      isImgChange: false,

      actionPath:'https://upload-z2.qiniup.com',
      postData: {},
      imageUrl: '',
      imageAlt: ''
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      let isAllow = true
      const isLt2M = file.size / 1024 / 1024 < 5

      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        isAllow = false

      if (!isAllow)
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')

      if (!isLt2M)
        this.$message.error('上传头像图片大小不能超过 5MB!')

      return isAllow && isLt2M
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrl = 'http://pydmbbyau.bkt.clouddn.com/' + res.key
      this.imageAlt = file.name.substring(0,file.name.length-4)
      this.isUpload = true
      this.insertImg(this.imgObj)
    },
    handleDivMouseEnter() {
      this.isImgChange = true
    },
    handleDivMouseLeave() {
      this.isImgChange = false
    },
    clearImg() {
      this.imageUrl  = ''
      this.isUpload = false
      this.$refs.upload.clearFiles()
    },
    ...mapMutations({
      insertImg: 'user/insertImg'
    })
  },
  computed: {
    imgObj() {
      return {
        imgSrc: this.imageUrl,
        imgAlt: this.imageAlt
      }
    },
    ...mapState({
      imgSrc: state => state.user.image.imgSrc,
      imgAlt: state => state.user.image.imgAlt
    })
  },
  created() {
    var policy = {}
    var bucketName = 'share-list'
    var AK ='P1ZMzS2ClZA0ccLzGubOO-vjSUJ-5UqXk4NOP7y0'
    var SK = 'hSG4WkKXI7IOQewF7rCjBjBmKvKa9gsfcU6IzDGC'
    var deadline = Math.round(new Date().getTime() / 1000) + 3600
    policy.scope = bucketName
    policy.deadline = deadline
    this.postData.token = genUpToken(AK, SK, policy)
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .el-upload
    width: 100%
    height: 12rem
    .el-upload-dragger
      background: $bgGrayColor
      width: 100%
      height: 12rem
      .avatar
        width: 100%
        height: 100%
        object-fit: cover
    .el-upload__input
      display: none

  .wrapper
    margin: 1rem auto 0
    cursor: pointer
    max-width: 66rem
    min-height: 19.2rem
    max-height: 25rem
    position: relative
    border-radius: $borderRadius
    box-sizing: border-box
    .img_change
      position: absolute
      right: 0
      top: 0
      background: #564343
      border-radius: $borderRadius
      display: flex
      justify-content: space-between
      align-items: center
      z-index: 99
      .icon_change
        display: inline-block
        margin: .6rem 1.2rem
        color: #f6f6f6
        font-size: 2.3rem
        cursor: pointer
      .icon_clear
        display: inline-block
        margin: .6rem 1.2rem
        color: $whiteTextColor
        font-size: 1.6rem
    .cancel_pointer
      cursor: pointer
    .uploade_picture
      display: block
      line-height: 19.2rem
      min-height: 19.2rem
      text-align: center
      .img_area
        width: 100%
        min-height: 19.2rem
        max-height: 25rem
        z-index: 3
        img
          width: 100%
          height: 100%
      .uploade_picture_input
        display: none
      .icon_camera
        margin: 0 auto
        width: 4.2rem
        height: 4.2rem
        font-size: 4.6rem
        color: rgba(26,26,26,.2)
      .fade-enter, .fade-leave-to
        opacity: 0
      .fade-enter-active, .fade-leave-active
          transition: opacity 1s
      .text
        position: absolute
        width: 100%
        text-align: center
        left: 0
        bottom: 5rem
        line-height: 1
        color: grey
      .img_alt
        position: absolute
        width: 100%
        text-align: center
        left: 0
        bottom: 1rem
        line-height: 1
        color: #f6f6f6
</style>
