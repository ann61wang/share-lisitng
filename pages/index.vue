<template>
  <div class="body_color">
    <home-header></home-header>
    <home-search></home-search>
    <home-swiper></home-swiper>
    <div class="haha">test</div>
  </div>
</template>

<script>
import HomeHeader from '~/components/home/Home'
import HomeSearch from '~/components/home/Search'
import HomeSwiper from '~/components/home/Swiper'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSearch,
    HomeSwiper
  }
}
</script>

<style lang="stylus" scoped>
  .body_color
    // background: #eee
    .haha
      margin-left: 50rem

</style>
