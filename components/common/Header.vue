<template lang="html">
  <header class="container-fluid navbar-fixed-top navbar_container">
    <nav class="navbar navbar-default navbar_container_nav nav_md nav_mobile" role="navigation">
      <div class="navbar_container_div">
        <div class="navbar-header nav_header">
          <button class="navbar-toggle" type="button" data-toggle="collapse">
            <span class="sr-only">Toggle Navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="navbar-brand navbar_container_search search_md search_mobile">
            <nuxt-link tag="div" to="/" class="navbar_logo">
              <div class="iconfont logo_icon logo_icon_mobile">🧾</div>
              <div class="logo_name logo_name_mobile">ShareL</div>
            </nuxt-link>
            <div class="navbar_search search_none" ref="search">
              <input type="search" placeholder="Search keyword">
              <!-- <span class="iconfont">&#xe60e;</span> -->
              <nuxt-link tag="div" to="#" class="glyphicon glyphicon-search search_icon"></nuxt-link>
            </div>
          </div>
        </div>
        <div class="collapse navbar-collapse navbar_container_item">
          <ul class="nav navbar-nav navbar-right">
            <li><nuxt-link to="#" class="navbar_item_content">SomeL</nuxt-link></li>
            <li><nuxt-link to="#" class="navbar_item_content">SomeL</nuxt-link></li>
            <li><nuxt-link to="#" class="navbar_item_content">SomeL</nuxt-link></li>
            <li><nuxt-link to="#" class="navbar_item_content">...</nuxt-link></li>
            <li><nuxt-link to="#" class="navbar_item_content navbar_item_btn">Publish</nuxt-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'CommonHeader'
}
</script>

<style lang="stylus" scoped>
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
            width: calc(100vw - 39.5rem) !important
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
              background: #05a081
              padding: 0 .8rem
              color: #fff
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
              font-size: 1.4rem
              font-weight: 600
              color: #fff
          @media (max-width: 13rem)
            .search_none
              display: none
              input
                display: none
              .search_icon
                display: none
          .navbar_search
            background: #5F6269
            border-radius: .2rem
            height: 4.2rem
            display: flex
            flex: 1 1 100%
            width: 100%
            max-width: 55rem
            font-size: 1.4rem
            color: #fff
            display: inline-block
            input
              background: #5F6269
              box-sizing: border-box
              border-radius: .2rem
              border: none
              outline: none
              color: #fff
              padding: 0 1.6rem
              width: calc(100% - 4.6rem) !important
              height: 4.2rem
              line-height: 4.2rem
            .search_icon
              cursor: pointer
        .navbar_container_item
          margin-right: 1.4rem
          .navbar_item_content
            color: #d3d3d3
            font-size: 1.4rem
            font-weight: 600
          .navbar_item_btn
            margin-left: 1rem
            background: #05a081
            border-radius: .2rem
            color: #fff
</style>
