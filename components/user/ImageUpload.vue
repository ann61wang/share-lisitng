<template lang="html">
  <div>
    <div class="wrapper" @mouseenter="handleDivMouseEnter" @mouseleave="handleDivMouseLeave">
      <div class="img_change" v-show="isUpload && isImgChange">
        <!-- <label class="iconfont icon_change" title="更换" for="file">&#xe60b;</label> -->
        <span class="iconfont icon_clear" title="删除" @click.prevent="clearImg">&#xe612;</span>
      </div>

      <label :class="isUpload ? 'uploade_picture' : 'uploade_picture cancel_pointer'" :for="upload">
        <div class="img_area" v-show="imageUrl">
          <img :src="imageUrl" :alt="imageAlt">
        </div>
        <input type="file" accept="image/png, image/jpeg, image/jpg" class="uploade_picture_input" id="picture" @change="getFile" ref="file">
        <div class="iconfont icon_camera" v-show="!isUpload">&#xe60b;</div>
        <transition-group name="fade">
          <div class="img_alt" v-show="isUpload && show" key="1">{{this.imgAlt}}</div>
          <div class="text" v-show="show && !isUpload" key="2">添加图片</div>
        </transition-group>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'ImageUpload',
  data() {
    return {
      isUpload: false,
      isImgChange: false,
      titleValue: '',
      descValue: '',
      show: false,
      upload: 'picture',
      imageUrl: '',
      imageAlt: ''
    }
  },
  methods: {
    handleDivMouseEnter() {
      this.isImgChange = true
      this.show = true
    },
    handleDivMouseLeave() {
      this.isImgChange = false
      this.show = false
    },
    getFile(e) {
      if(e.target.files[0]) {
        let type = e.target.files[0].type
        let size = e.target.files[0].size
        let isAllow = true
        const isLt2M = size / 1024 / 1024 < 5

        if(type !== 'image/jpeg' && type !== 'image/png') isAllow = false
        if (!isAllow) this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        if (!isLt2M) this.$message.error('上传头像图片大小不能超过 5MB!')

        if(isAllow && isLt2M) {
          let self = this
          let reader = new FileReader()
          let selectedFile = e.target.files[0]
          this.imageObj.imgAlt = selectedFile.name
          this.imageAlt = this.imageObj.imgAlt
          reader.readAsDataURL(e.target.files[0])
          reader.onload = ((el) => {
            self.imageUrl = el.target.result
          })

          this.cos.putObject({
            Bucket: 'sharelist-1255748781',
            Region: 'ap-guangzhou',
            Key: self.imageAlt,
            Body: selectedFile,
            onProgress: function (progressData) {
              // console.log(JSON.stringify(progressData))
            }
          }, function (err,data) {
            console.log(err || data)
            if(data) {
              self.imageObj.imgSrc = 'https://' + data.Location
              self.insertImg(Object.assign({},self.imageObj))
            }
          })

          this.isUpload = true
          this.show = false
          this.upload = ''
        }
      }
    },
    clearImg() {
      this.clearImage()
      this.imageUrl  = this.imgSrc
      this.isUpload = false
      this.upload = 'picture'
      // this.$refs.upload.clearFiles()
      this.$refs.file.value = ''
      if(this.imageAlt) {
        this.cos.deleteObject({
          Bucket: 'sharelist-1255748781',
          Region: 'ap-guangzhou',
          Key: this.imageAlt,
        }, (err, data) => {
          if(err) {
            console.log(err)
          }else {
            console.log(data)
          }
        })
      }
    },
    ...mapMutations({
      insertImg: 'user/insertImg',
      clearImage: 'user/clearImage'
    })
  },
  computed: {
    imageObj() {
      return {
        imgSrc: this.imageUrl,
        imgAlt: this.imageAlt
      }
    },
    ...mapState({
      imgSrc: state => state.user.image.imgSrc,
      imgAlt: state => state.user.image.imgAlt
    }),
    ...mapGetters({
      cos: 'localStorage/initCOS'
    })
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    margin: 1rem auto 1rem
    cursor: pointer
    width: 20rem
    min-height: 10rem
    max-height: 10rem
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
        font-size: 1.4rem
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
      line-height: 10rem
      min-height: 10rem
      text-align: center
      .img_area
        width: 100%
        min-height: 10rem
        max-height: 10rem
        z-index: 3
        img
          width: 100%
          height: 100%
          max-height: 10rem
          object-fit: cover
      .uploade_picture_input
        display: none
      .icon_camera
        margin: 0 auto
        width: 2.4rem
        height: 2.4rem
        font-size: 2.6rem
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
        bottom: 1rem
        line-height: 1
        color: grey
      .img_alt
        position: absolute
        width: 100%
        text-align: center
        left: 0
        line-height: 1
        color: #f6f6f6
</style>
