<template lang="html">
  <section class="section_max_width">
    <div class="wrapper">
      <h1 class="section_title_large" v-text="listData.title"></h1>
      <p class="description" v-text="listData.desc"></p>
      <div class="section_img">
        <img :src="listData.imgSrc" :alt="listData.imgAlt">
      </div>

      <ul class="list_checkboxes">
        <li :class="item.liClassName" v-for="(item,index) of listData.listMessage" :key="index">
          <input type="checkbox" class="input_checkbox" :id="index">
          <label :for="index" v-show="!item.labelShow.subTitle && !item.labelShow.numMaker && item.labelShow.boxShow"><span></span></label>
          <span :class="item.spanClassName" v-text="item.content"></span>
        </li>
      </ul>

      <button class="btn btn-default collect_btn">Copy this checklist</button>
      <div class="level">
        <nuxt-link class="level_item" to="/"><span class="iconfont">&#xe62c;</span>  174 copies saved<span class="spacer"></span></nuxt-link>
        <nuxt-link class="level_item" to="/"><span class="iconfont">&#xe62b;</span>  979 views</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
let Base64 = require("js-base64").Base64

export default {
  name: 'ListMain',
  props: {
    listData: Object
  },
  // data() {
  //   return {
  //     title: '',
  //     desc: '',
  //     imgSrc: '',
  //     imgAlt: '',
  //     listMessage: []
  //   }
  // },
  // methods: {
  //   getListInfo() {
  //     axios.get('http://localhost:3000/users/' + this.session + '/tasks/' + this.$route.params.id)
  //       .then(this.handleGetInfo).catch(reason => console.log(reason))
  //   },
  //   handleGetInfo(res) {
  //     let data = res.data
  //     this.title = data.title
  //     this.desc = data.desc
  //     this.imgSrc = Base64.decode(data.imgSrc)
  //     this.imgAlt = data.imgAlt
  //     this.listMessage = data.listMessage
  //   }
  // },
  computed: {
    ...mapState({
      session: state => state.localStorage.session
    })
  },
  // mounted() {
  //   this.getListInfo()
  // }
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
      .level_item
        text-decoration: none
        color: #666
        .spacer
          margin-right: 1.6rem
</style>
