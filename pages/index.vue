<template>
  <div class="body_min_width">
    <home-header :user="user"></home-header>
    <home-search></home-search>
    <div class="main_area">
      <home-swiper :categories="categories"></home-swiper>
      <home-trending :taskArr="taskArr" ref="trending"></home-trending>
      <home-publish></home-publish>
      <home-topPub></home-topPub>
    </div>
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
    let [request1Data, request2Data] = await Promise.all([
      app.$axios.get('/api/categories'),
      app.$axios.get('/api/tasks?trending=1')
    ])
    if(request1Data.data.ret_code == 0) {
      return {
        user: request1Data.data.user,
        categories: request1Data.data.categories,
        taskArr: request2Data.data
      }
    }else {
      return {
        user: '',
        categories: request1Data.data.categories,
        taskArr: request2Data.data
      }
    }
  },
  methods: {
    ...mapMutations({
      haveSession: 'localStorage/haveSession',
      nRefresh: 'localStorage/nRefresh',
    })
  },
  computed: {
    ...mapState({
      session: state => state.localStorage.session,
      refresh: state => state.localStorage.refresh
    })
  },
  mounted () {
    this.haveSession(this.user)
  },
  activated () {
    if(this.refresh) {
      this.$refs.trending.handleTrending()
      this.nRefresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .body_min_width
    min-width: $minWidth
    .main_area
      max-width: 144rem
      margin: 0 auto;
</style>
