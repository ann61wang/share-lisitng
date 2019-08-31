<template lang="html">
  <header class="container-fluid hero">
    <div class="hero_hover"></div>
    <div class="hero_background">
      <img src="https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500" alt="">
    </div>
    <section class="hero_content">
      <h1 class="hero_title">Use lists to live the life you want happy happy happy</h1>
      <div>
        <div class="hero_search">
          <input type="search" placeholder="Search keyword">
          <nuxt-link tag="div" to="#" class="glyphicon glyphicon-search search_icon"></nuxt-link>
        </div>
        <div class="search_tags">Suggested: notebook  gym  yoga  writing  paper  working  more</div>
      </div>
    </section>
    <div class="hero_footer"></div>
  </header>
</template>

<script>
export default {
  name: 'HomeSearch'
}
</script>

<style lang="stylus" scoped>
  .hero
    position: relative
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center
    padding: 1.6rem
    padding-top: 6.6rem
    padding-bottom: 6.6rem
    color: $whiteTextColor
    text-decoration: none
    height: 100%
    max-height: 50rem
    min-height: 38rem
    z-index: 0
    .hero_hover
      content: ""
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.2) 100%),linear-gradient(180deg,rgba(0,0,0,0.2) 0%,transparent 100%)
      z-index: 1
    .hero_background
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      width: 100%
      height: 100%
      overflow: hidden
      img
        width: 100%
        height: 100%
        object-fit: cover
        background: #232a34
        max-width: 100%
    .hero_content
      z-index: 2
      max-width: 65rem
      width: 100%
      margin: 7.5rem 0
      .hero_title
        display: block
        font-size: 3.6rem
        line-height: 4.8rem
        margin-top: 0;
        margin-bottom: 1.5rem
        font-weight: 700
      .hero_search
        margin-top: 4rem
        display: flex
        flex: 1 1 100%
        max-width: 100%
        background: $bgWhiteColor
        input
          width: calc(100% - 4.6rem) !important
          border-top-right-radius: 0
          border-bottom-right-radius: 0
          border-right: none
          padding: 1.44rem 1.6rem
          display: block
          font-size: 1.6rem
          line-height: 2.5rem
          margin-top: 0
          margin-bottom: .9rem
          font-weight: 300
          margin-bottom: 0
          text-decoration: none
          border: none
          border-radius: $borderRadius
          outline: none
          -webkit-appearance: none
          color: $darkTextColor
        .search_icon
          cursor: pointer
          color: #666
          height: 5.378rem
          line-height: 5.378rem
      .search_tags
        margin: .8rem 0
    .hero_footer
      font-size: 1.2rem
      line-height: 1.9rem
      margin-top: 0
      font-weight: $fontWeight
      margin-bottom: 0
      position: absolute
      height: 5rem
      left: 0
      right: 0
      bottom: 0
      display: flex
      align-items: center
      justify-content: space-between
      padding: 0 1.6rem
      z-index: 2
</style>
