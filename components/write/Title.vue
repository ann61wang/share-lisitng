<template lang="html">
  <div>
    <div class="wrapper" @mouseenter="handleDivMouseEnter" @mouseleave="handleDivMouseLeave">
      <div class="img_change" v-show="isUpload && isImgChange">
        <!-- <label class="iconfont icon_change" title="更换" for="file">&#xe60b;</label> -->
        <span class="iconfont icon_clear" title="删除" @click.prevent="clearImg">&#xe612;</span>
      </div>

      <!-- <el-upload
        ref="upload"
        class="upload-demo"
        drag
        :action="actionPath"
        :show-file-list="false"
        accept="image/jpeg,image/png"
        :before-upload="beforeImgUpload"
        :on-progress="imgUpload"
        :data="postData"
        :on-success="handleImgSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" :alt="imageAlt" class="avatar">
        <i v-else class="el-icon-upload"></i>
        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传 jpg/png 文件，且不超过 5MB</div>
      </el-upload> -->

      <label :class="isUpload ? 'uploade_picture' : 'uploade_picture cancel_pointer'" :for="upload">
        <div class="img_area" v-show="imageUrl">
          <img :src="imageUrl" :alt="imageAlt">
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
if(process.browser) {
  var COS = require('cos-js-sdk-v5')
}

export default {
  name: 'WriteTitle',
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
    // beforeImgUpload(file) {
    //   let isAllow = true
    //   const isLt2M = file.size / 1024 / 1024 < 5
    //
    //   if(file.type !== 'image/jpeg' && file.type !== 'image/png')
    //     isAllow = false
    //
    //   if (!isAllow)
    //     this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
    //
    //   if (!isLt2M)
    //     this.$message.error('上传头像图片大小不能超过 5MB!')
    //
    //   return isAllow && isLt2M
    // },
    // handleImgSuccess(res, file) {
    //   // this.imageUrl = URL.createObjectURL(file.raw)
    //   this.imageUrl = 'http://pydmbbyau.bkt.clouddn.com/' + res.key
    //   this.imageAlt = file.name.substring(0,file.name.length-4)
    //   this.insertImg(this.imageObj)
    //   this.isUpload = true
    // },
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
          this.imageObj.imgAlt = selectedFile.name.substring(0,selectedFile.name.length-4)
          this.imageAlt = this.imageObj.imgAlt
          reader.readAsDataURL(e.target.files[0])
          reader.onload = ((el) => {
            self.imageUrl = el.target.result
          })

          let cos = new COS({
            getAuthorization: function (options,callback) { 
              let authorization = COS.getAuthorization({
                SecretId: 'AKIDINCh4EtmEX3S2Zerdw1rQn6NSJ5SlqdY',
                SecretKey: 'xz6DEE3dfT2QjKjy0mY8TabOfiaOybx5',
                Method: options.Method,
                Key: options.Key,
                Query: options.Query,
                Headers: options.Headers,
                Expires: 60,
              });
              callback(authorization);
            }
          })

          cos.putObject({
            Bucket: 'sharelist-1255748781',
            Region: 'ap-guangzhou',
            Key: self.imageAlt,
            Body: selectedFile,
            onProgress: function (progressData) {
              console.log(JSON.stringify(progressData))
            }
          }, function (err,data) {
            console.log(err || data)
            if(data) {
              self.imageObj.imgSrc = 'https://' + data.Location
              self.insertImg(Object.assign({},self.imageObj))
            }
          })

          // cos.getObject({
          //   Bucket: 'sharelist-1255748781',
          //   Key: self.imageAlt,
          //   Region: 'ap-guangzhou',
          //   Sign: false
          // }, function (err, data) {
          //   console.log(err || data,'返回值')
          //   if(data) {
          //     console.log(data.Url)
          //   }
          // })

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
    },
    ...mapMutations({
      insertImg: 'localStorage/insertImg',
      clearImage: 'localStorage/clearImage',
      syncValue: 'localStorage/syncValue'
    })
  },
  computed: {
    imageObj() {
      return Object.assign({},{
        imgSrc: this.imageUrl,
        imgAlt: this.imageAlt
      })
    },
    titleObj() {
      return Object.assign({},{ title: this.titleValue, desc: this.descValue })
    },
    ...mapState({
      imgAlt: state => state.localStorage.image.imgAlt,
      imgSrc: state => state.localStorage.image.imgSrc,
      titleCache: state => state.localStorage.title.titleCache,
      descCache: state => state.localStorage.title.descCache
    })
  },
  watch: {
    titleValue() {
      this.syncValue(this.titleObj)
    },
    descValue() {
      this.syncValue(this.titleObj)
    }
  },
  mounted() {
    if(this.imgSrc) {
      this.isUpload = true
      this.imageUrl = this.imgSrc
      this.imageAlt = this.imgAlt
    }
    if(this.titleCache || this.descCache) {
      this.titleValue = this.titleCache
      this.descValue = this.descCache
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper >>> .el-upload
    width: 100%
    height: 22rem
    .el-upload-dragger
      background: $bgGrayColor
      width: 100%
      height: 22rem
      .avatar
        width: 100%
        height: 100%
        object-fit: cover
    .el-upload__input
      display: none

  .wrapper
    margin: 10rem auto 0
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
      bottom: .5rem
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
          max-height: 25rem
          object-fit: cover
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
