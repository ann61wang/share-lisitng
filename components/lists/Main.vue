<template lang="html">
  <section class="section_max_width">
    <div class="wrapper">
      <h1 class="section_title_large" v-text="listData.title"></h1>
      <p class="description" v-text="listData.desc"></p>
      <div class="section_img">
        <img :src="listData.imgSrc" :alt="listData.imgAlt">
      </div>

      <ul class="list_checkboxes">
        <li :class="item.liClassName" v-for="(item,key) of listData.listMessage" :key="key">
          <input type="checkbox" class="input_checkbox" :id="key">
          <label :for="key" v-show="!item.labelShow.subTitle && !item.labelShow.numMaker && item.labelShow.boxShow"><span></span></label>
          <span :class="item.spanClassName" v-text="item.content"></span>
        </li>
      </ul>

      <button class="btn btn-default collect_btn" v-show="!isMaker" @click="handleCopyList">复制这个清单</button>
      <el-row v-show="isMaker">
        <el-button type="primary" icon="el-icon-edit" @click="handleEditBtn" circle></el-button>
        <el-popover
          placement="top"
          width="160"
          v-model="visible">
          <p>你确定要删除这个清单吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="handleDeleteBtn">确定</el-button>
          </div>
          <el-button type="danger" icon="el-icon-delete" slot="reference" circle></el-button>
        </el-popover>
      </el-row>
      <div class="level">
        <div class="text_center">
          <nuxt-link class="level_item" to="/"><span class="iconfont">&#xe62c;</span>  {{listData.copy}} 复制量<span class="spacer"></span></nuxt-link>
          <nuxt-link class="level_item" to="/"><span class="iconfont">&#xe62b;</span>  {{listData.pv}} 浏览量</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
let Base64 = require("js-base64").Base64

export default {
  name: 'ListMain',
  props: {
    listData: Object
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleCopyList() {
      this.$router.push('/copy?id=' + this.$route.params.id)
    },
    handleEditBtn() {
      this.$router.push('/lists/' + this.$route.params.id + '/edit')
    },
    handleDeleteBtn() {
      this.visible = false
      this.$axios.delete('/api/tasks/' + this.$route.params.id)
      .catch((e) => {
        error({ statusCode: 404, message: '页面没有找到' })
      })
      this.yRefresh()
      this.clearCosImg(this.listData.imgAlt)
      this.$router.push('/user/' + this.session)
    },
    ...mapMutations({
      yRefresh: 'localStorage/yRefresh',
      clearCosImg: 'localStorage/clearCosImg'
    })
  },
  computed: {
    ...mapState({
      session: state => state.localStorage.session
    }),
    isMaker() {
      if(this.listData.author !== undefined) {
        return this.listData.author._id === this.session
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/styles/list.styl'

  .section_max_width
    max-width: 80rem
    margin: 0 auto
    .section_title_large
      text-align: center
    .description
      text-align: center
      font-size: 2rem
      margin-top: 1rem
    .section_img
      width: 100%
      height: 30rem
      margin: 3rem 0
      img
        width: 100%
        height: 100%
        display: block
        object-fit: cover
    .el-row
      margin: 0 auto
      margin-top: 10rem
      margin-bottom: 1.6rem
      width: 9.5rem
    .collect_btn
      display: block
      margin: 0 auto
      margin-top: 10rem
      margin-bottom: 1.6rem
      padding: 1rem 4rem
      background: $bgBtnColor
      color: $whiteTextColor
      font-size: $fontSize
      font-weight: $fontWeight
    .level
      margin: 0 auto
      width: 24rem
      .text_center
        margin: 0 auto
        width: 18rem
        .level_item
          text-decoration: none
          color: #666
          .spacer
            margin-right: 1.6rem
</style>
