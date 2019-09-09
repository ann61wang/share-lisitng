<template lang="html">
  <div>
    <div class="wrapper" @mouseenter="handleDivMouseEnter" @mouseleave="handleDivMouseLeave">
      <div class="img_change" v-show="isUpload && isImgChange">
        <label class="iconfont icon_change" title="更换" for="picture">&#xe60b;</label>
        <span class="iconfont icon_clear" title="删除" @click.prevent="clearImg">&#xe612;</span>
      </div>
      <label :class="isUpload ? 'uploade_picture' : 'uploade_picture cancel_pointer'" :for="upload">
        <div class="img_area" v-show="isUpload">
          <img :src="imgSrc" :alt="altName">
        </div>
        <input type="file" accept="image/png, image/jpeg, image/jpg" class="uploade_picture_input" id="picture" @change="getFile" ref="file">
        <div class="iconfont icon_camera" v-show="!isUpload">&#xe60b;</div>
        <transition name="fade">
          <div class="text" v-show="show && !isUpload">添加题图</div>
        </transition>
      </label>
    </div>
    <div class="input_wrapper">
      <textarea rows="1" spellcheck="false" placeholder="请输入标题（最多输入30字）" class="input_title"></textarea>
    </div>
    <div class="input_wrapper">
      <textarea rows="1" spellcheck="false" placeholder="描述你的清单（最多输入100字)" class="input_description"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WriteTitle',
  data() {
    return {
      show: false,
      imgSrc: '',
      altName: '',
      isUpload: false,
      isImgChange: false,
      upload: 'picture'
    }
  },
  methods: {
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
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ((el) => this.imgSrc = el.target.result)
        this.altName = e.target.files[0].name
        this.isUpload = true
        this.upload = ''
      }
    },
    clearImg() {
      if(this.$refs.file.files[0]) {
        this.$refs.file.value = ''
        this.imgSrc = ''
        this.altName = ''
        this.isUpload = false
        this.upload = 'picture'
      }else if(!this.$refs.file.files[0] && this.imgSrc) {
        this.imgSrc = ''
        this.altName = ''
        this.isUpload = false
        this.upload = 'picture'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
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
