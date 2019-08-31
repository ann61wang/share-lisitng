<template>
  <div class="body_min_width">
    <home-header></home-header>
    <home-search></home-search>
    <home-swiper></home-swiper>
    <home-trending></home-trending>
    <home-publish></home-publish>
    <home-topPub></home-topPub>
    <common-footer></common-footer>
  </div>
</template>

<script>
import HomeHeader from '~/components/home/Header'
import HomeSearch from '~/components/home/Search'
import HomeSwiper from '~/components/home/Swiper'
import HomeTrending from '~/components/home/Trending'
import HomePublish from '~/components/home/Publish'
import HomeTopPub from '~/components/home/TopPub'
import CommonFooter from '~/components/common/Footer'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSearch,
    HomeSwiper,
    HomeTrending,
    HomePublish,
    HomeTopPub,
    CommonFooter
  }
}
</script>

<style lang="stylus" scoped>
  .body_min_width
    min-width: $minWidth
</style>
