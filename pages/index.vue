<template>
  <div class="body_min_width">
    <home-header :user="user"></home-header>
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
import { mapState, mapMutations } from 'vuex'

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
  },
  async asyncData ({ app, error }) {
    return app.$axios.get('/api/login')
    .then((res) => {
      let data = res.data
      if(data.ret_code == 0) {
        return {
          user: data.user
        }
      }else {
        return {
          user: ''
        }
      }
    })
    .catch((e) => {
      error({ statusCode: 404, message: '页面没有找到' })
    })
  },
  methods: {
    ...mapMutations({
      haveSession: 'localStorage/haveSession'
    })
  },
  computed: {
    ...mapState({
      session: state => state.localStorage.session
    })
  },
  mounted() {
    this.haveSession(this.user)
  }
}
</script>

<style lang="stylus" scoped>
  .body_min_width
    min-width: $minWidth
</style>
