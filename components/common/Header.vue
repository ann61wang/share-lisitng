<template lang="html">
  <header class="container-fluid navbar-fixed-top navbar_container">
    <nav class="navbar navbar-default navbar_container_nav nav_md nav_mobile" role="navigation">
      <div class="navbar_container_div">
        <div class="navbar-header nav_header">
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#menu">
            <span class="sr-only">Toggle Navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="navbar-brand navbar_container_search search_md search_mobile">
            <nuxt-link tag="div" to="/" class="navbar_logo">
              <div class="iconfont logo_icon logo_icon_mobile">&#xe606;</div>
              <div class="logo_name logo_name_mobile">共享清单</div>
            </nuxt-link>
            <div class="navbar_search search_none" @keydown.13="handleSearch">
              <input type="search" placeholder="输入关键词" v-model="inputValue">
              <!-- <span class="iconfont">&#xe60e;</span> -->
              <div class="glyphicon glyphicon-search search_icon" @click="handleSearch"></div>
            </div>
          </div>
        </div>
        <div class="collapse navbar-collapse navbar_container_item" id="menu">
          <ul class="nav navbar-nav navbar-right">
            <li><nuxt-link to="/login" class="navbar_item_content" v-show="!session">登陆</nuxt-link></li>
            <li><nuxt-link to="/join" class="navbar_item_content" v-show="!session">注册</nuxt-link></li>
            <li><nuxt-link :to="`/user/${session}`" class="navbar_item_content" v-show="session">个人中心</nuxt-link></li>
            <li @click="handleLoginOut"><nuxt-link to="/" class="navbar_item_content" v-show="session">登出</nuxt-link></li>
            <li><nuxt-link to="/write" class="navbar_item_content navbar_item_btn">发布清单</nuxt-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
  name: 'CommonHeader',
  props: ['keyword'],
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    handleSearch() {
      if(this.inputValue) {
        this.$router.push({name: 'search-id', params:{id: this.inputValue}})
      }else {
        this.$message.error('请输入关键词')
      }
    },
    ...mapMutations({
      clearSession: 'localStorage/clearSession'
    }),
    handleLoginOut() {
      this.$axios.get('/api/logout')
        .then(this.handleGetInfo).catch(reason => console.log(reason))
    },
    handleGetInfo(res) {
      this.clearSession()
    }
  },
  computed: {
    ...mapState({
      session: state => state.localStorage.session
    })
  },
  activated() {
    if(this.keyword) {
      this.inputValue = this.keyword
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/styles/varibles.styl'
  .navbar_container
    min-height: 5.8rem
    padding: 0
    z-index: 30
    @media (max-width: 47.99rem)
      .nav_mobile
        padding: .4rem 1.6rem
    @media (min-width: 47.99rem)
      .nav_md
        padding: .4rem 2.4rem
    .navbar_container_nav
      background: #232a34
      transition: background .15s ease-in-out
      .navbar_container_div
        margin-left: -1.6rem
        button
          background: transparent
        @media (min-width: 47.99rem)
          .search_md
            width: calc(100vw - 28rem) !important
        @media (max-width: 47.99rem)
          .search_mobile
            width: calc(100vw - 5rem) !important
        .navbar_container_search
          display: flex
          align-items: center
          flex: 1 1 100%
          .navbar_logo
            display: flex
            align-items: center
            cursor: pointer
            .logo_icon
              background: $bgBtnColor
              padding: 0 .8rem
              color: $whiteTextColor
              font-size: 1.8rem
              width: 3.2rem
              height: 3.2rem
              line-height: 3.2rem
            @media (max-width: 70rem)
              .logo_name_mobile
                margin: 0 2.5rem 0 1.6rem
                min-width: 5.6rem
            @media (min-width: 70rem)
              .logo_name_mobile
                margin: 0 4rem 0 2rem
                min-width: 5.6rem
            @media (max-width: 37.5rem)
              .logo_icon_mobile
                margin-right: 2rem
              .logo_name_mobile
                display: none
            .logo_name
              font-size: $fontSize
              font-weight: $fontWeight
              color: $whiteTextColor
          @media (max-width: 13rem)
            .search_none
              display: none
              input
                display: none
              .search_icon
                display: none
          .navbar_search
            background: $bgInputColor
            border-radius: $borderRadius
            height: 4.2rem
            display: flex
            flex: 1 1 100%
            width: 100%
            max-width: 55rem
            font-size: $fontSize
            color: $whiteTextColor
            display: inline-block
            input
              background: $bgInputColor
              box-sizing: border-box
              border-radius: $borderRadius
              border: none
              outline: none
              color: $whiteTextColor
              padding: 0 1.6rem
              width: calc(100% - 4.6rem) !important
              height: 4.2rem
              line-height: 4.2rem
            .search_icon
              cursor: pointer
        .navbar_container_item
          margin-right: 1.4rem
          .navbar_item_content
            color: $grayTextColor
            font-size: $fontSize
            font-weight: $fontWeight
          .navbar_item_btn
            margin-left: 1rem
            background: $bgBtnColor
            border-radius: $borderRadius
            color: $whiteTextColor
</style>
