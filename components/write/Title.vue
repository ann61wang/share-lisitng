<template lang="html">
  <div>
    <div class="wrapper" @mouseenter="handleDivMouseEnter" @mouseleave="handleDivMouseLeave">
      <div class="img_change" v-show="isUpload && isImgChange">
        <label class="iconfont icon_change" title="更换" for="picture">&#xe60b;</label>
        <span class="iconfont icon_clear" title="删除" @click.prevent="clearImg">&#xe612;</span>
      </div>

      <!-- <el-upload
        class="upload-demo"
        drag
        :action="actionPath"
        accept="image/jpeg,image/png"
        :before-upload="beforeAvatarUpload"
        :data="postData"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传 jpg/png 文件，且不超过 5MB</div>
      </el-upload> -->

      <label :class="isUpload ? 'uploade_picture' : 'uploade_picture cancel_pointer'" :for="upload">
        <div class="img_area" v-show="imgSrc">
          <img :src="cacheImgSrc" :alt="imgAlt">
        </div>
        <input type="file" accept="image/png, image/jpeg, image/jpg" class="uploade_picture_input" id="picture" @change="getFile" ref="file">
        <div class="iconfont icon_camera" v-show="!isUpload">&#xe60b;</div>
        <transition-group name="fade">
          <div class="img_alt" v-show="isUpload && show" key="1">{{this.imgAlt}}</div>
          <div class="text" v-show="show && !isUpload" key="2">添加题图</div>
        </transition-group>
      </label>


    </div>
    <div class="input_wrapper">
      <textarea class="input_title" rows="1" spellcheck="false" placeholder="请输入标题（最多输入30字）" v-model="titleValue">
        {{this.titleValue}}
      </textarea>
    </div>
    <div class="input_wrapper">
      <textarea class="input_description" rows="1" spellcheck="false" placeholder="描述你的清单（最多输入100字)" v-model="descValue">
        {{this.descValue}}
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { genUpToken } from '@/assets/styles/qiniuToken'

export default {
  name: 'WriteTitle',
  data() {
    return {
      show: false,
      isUpload: false,
      isImgChange: false,
      upload: 'picture',
      cacheImgSrc: '',
      titleValue: '',
      descValue: '',

      actionPath:'https://upload.qiniup.com',
      postData: {},
      imageUrl: ''
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isAllow = true
      const isLt2M = file.size / 1024 / 1024 < 5

      if(file.type !== 'image/jpeg' || file.type !== 'image/png')
        isAllow = false

      if (!isAllow)
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')

      if (!isLt2M)
        this.$message.error('上传头像图片大小不能超过 5MB!')

      return isAllow && isLt2M
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleDivMouseEnter() {
      this.show = true
      this.isImgChange = true
    },
    handleDivMouseLeave() {
      this.show = false
      this.isImgChange = false
    },
    getFile(e) {
      if(e.target.files[0]) {
        let reader = new FileReader()
        let obj = {}
        obj.imgAlt = e.target.files[0].name
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ((el) => {
          obj.imgSrc = el.target.result
          this.insertImg(obj)
          this.cacheImgSrc  = this.imgSrc
        })
        this.isUpload = true
        this.upload = ''
      }
    },
    clearImg() {
      if(this.$refs.file.files[0]) {
        this.$refs.file.value = ''
        this.clearImgAlt()
        this.cacheImgSrc  = this.imgSrc
        this.isUpload = false
        this.upload = 'picture'
      }else if(!this.$refs.file.files[0] && this.imgSrc) {
        this.clearImgAlt()
        this.cacheImgSrc  = this.imgSrc
        this.isUpload = false
        this.upload = 'picture'
      }
    },
    ...mapMutations({
      insertImg: 'localStorage/insertImg',
      clearImgAlt: 'localStorage/clearImgAlt',
      loadImg: 'localStorage/load',
      syncValue: 'localStorage/syncValue'
    })
  },
  computed: {
    ...mapState({
      imgAlt: state => state.localStorage.test.imgAlt,
      imgSrc: state => state.localStorage.test.imgSrc,
      titleCache: state => state.localStorage.test.titleCache,
      descCache: state => state.localStorage.test.descCache
    })
  },
  watch: {
    titleValue() {
      this.syncValue({
        title: this.titleValue,
        desc: this.descValue
      })
    },
    descValue() {
      this.syncValue({
        title: this.titleValue,
        desc: this.descValue
      })
    }
  },
  mounted() {
    if(this.imgSrc) this.isUpload = true
    this.cacheImgSrc  = this.imgSrc
    if(this.titleCache || this.descCache) {
      this.titleValue = this.titleCache
      this.descValue = this.descCache
    }
  },
  // created() {
  //   var policy = {}
  //   var bucketName = 'zhizhuoedu'
  //   var AK ='你的七牛云AK'
  //   var SK = '你的七牛云SK'
  //   var deadline = Math.round(new Date().getTime() / 1000) + 3600
  //   policy.scope = bucketName
  //   policy.deadline = deadline
  //   this.postData.token = genUpToken(AK, SK, policy)
  // }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .el-upload__input
    display: none

  .wrapper
    margin: 10rem auto 0
    cursor: pointer
    max-width: 66rem
    min-height: 19.2rem
    max-height: 25rem
    position: relative
    border-radius: $borderRadius
    background: $bgGrayColor
    box-sizing: border-box
    .img_change
      position: absolute
      right: 0
      bottom: -1rem
      background: #564343
      border-radius: $borderRadius
      display: flex
      justify-content: space-between
      align-items: center
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
  .input_wrapper
    padding: 0
    height: auto
    width: 100%
    position: relative
    display: flex
    background: $bgWhiteColor
    .input_title
      display: block
      margin: 1.6rem 0
      flex: 1 1
      padding: 0
      resize: none
      min-height: 4.4rem
      width: 100%
      border: 0
      font-size: 3.2rem
      line-height: 1.4
      font-weight: $fontWeight
      font-synthesis: style
      outline: none
      color: $darkTextColor
    .input_description
      display: block
      margin-bottom: .8rem
      flex: 1 1
      padding: 0 .2rem
      resize: none
      min-height: 4.4rem
      width: 100%
      border: 0
      font-size: 1.6rem
      line-height: 1.4
      font-weight: $fontWeight
      font-synthesis: style
      outline: none
      color: #555
</style>
