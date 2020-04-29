<template lang="html">
  <div class="navbar_container">
    <el-row :gutter="10">
      <el-col :xs="2" :sm="3" :md="4" :lg="4" :xl="4">
        <nuxt-link tag="div" to="/" class="navbar_logo">
          <div class="iconfont logo_icon logo_icon_mobile">&#xe606;</div>
          <div class="logo_name logo_name_mobile">ShareL</div>
        </nuxt-link>
      </el-col>
      <el-col :xs="14" :sm="14" :md="12" :lg="12" :xl="12">
        <div class="navbar_search search_none" :style="">
          <input type="search" placeholder="Search keyword">
          <nuxt-link tag="div" to="#" class="iconfont search_icon">&#xe60e;</nuxt-link>
        </div>
      </el-col>
      <el-col :xs="4" :sm="4" :md="8" :lg="8" :xl="8">
        <div class="navbar_container_item">
          <ul class="nav navbar-nav navbar-right">
            <li><nuxt-link to="#" class="navbar_item_content">登陆</nuxt-link></li>
            <li><nuxt-link to="#" class="navbar_item_content">注册</nuxt-link></li>
            <li><nuxt-link to="/write" class="navbar_item_content navbar_item_btn">发布清单</nuxt-link></li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HeaderEleUl',

}
</script>

<style lang="stylus" scoped>
  .navbar_container
    min-height: 5.8rem
    padding: .4rem 2.4rem
    z-index: 30
    background: #ccc
    .navbar_logo
      display: flex
      align-items: center
      cursor: pointer
      .logo_icon
        background: $bgBtnColor
        padding: 0 .8rem
        color: $whiteTextColor
        width: 3.2rem
        height: 3.2rem
        line-height: 3.2rem
      @media (max-width: 50rem)
        .logo_name_mobile
          margin: 0 2.5rem 0 1.6rem
      @media (min-width: 50rem)
        .logo_name_mobile
          margin: 0 4rem 0 2rem
      @media (max-width: 37.5rem)
        .logo_icon_mobile
          margin-right: 2rem
        .logo_name_mobile
          display: none
      .logo_name
        font-size: $fontSize
        font-weight: $fontWeight
        color: $whiteTextColor

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
      display: none
      input
        background: $bgInputColor
        box-sizing: border-box
        border-radius: $borderRadius
        border: none
        outline: none
        color: $whiteTextColor
        padding: 0 1.6rem
        // width: calc(100% - 4.6rem) !important
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
