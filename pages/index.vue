<template>
  <div class="body_color">
    <home-header></home-header>
    <home-search></home-search>
    <home-swiper></home-swiper>
    <home-trending></home-trending>
    <home-publish></home-publish>
    <home-topPub></home-topPub>
    <div class="haha">test</div>
  </div>
</template>

<script>
import HomeHeader from '~/components/home/Header'
import HomeSearch from '~/components/home/Search'
import HomeSwiper from '~/components/home/Swiper'
import HomeTrending from '~/components/home/Trending'
import HomePublish from '~/components/home/Publish'
import HomeTopPub from '~/components/home/TopPub'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSearch,
    HomeSwiper,
    HomeTrending,
    HomePublish,
    HomeTopPub
  }
}
</script>

<style lang="stylus" scoped>
  .body_color
    // background: #eee
    .haha
      margin-top: 20rem
      margin-left: 50rem
      height: 10rem

</style>
