<template>
  <div class="body_color">
    <home-header ref="nav"></home-header>
    <home-search></home-search>
    <home-swiper></home-swiper>
    <home-trending></home-trending>
    <home-publish></home-publish>
    <home-topPub></home-topPub>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeHeader from '~/components/home/Header'
import HomeSearch from '~/components/home/Search'
import HomeSwiper from '~/components/home/Swiper'
import HomeTrending from '~/components/home/Trending'
import HomePublish from '~/components/home/Publish'
import HomeTopPub from '~/components/home/TopPub'
import HomeFooter from '~/components/home/Footer'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSearch,
    HomeSwiper,
    HomeTrending,
    HomePublish,
    HomeTopPub,
    HomeFooter
  },
  mounted() {
    let _this = this
    window.addEventListener('scroll', _this.handleScroll, true)
  },
  methods: {
    handleScroll() {
      this.$refs.nav.scrollChange()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
