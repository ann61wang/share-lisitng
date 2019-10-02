<template lang="html">
  <div class="body_min_width">
    <common-header></common-header>
    <div class="container-fluid margin_medium">
      <div class="container_max_width">
        <h2 v-if="isHaveList">搜索关键词 {{this.$route.params.id}} 的结果：</h2>
        <h2 v-else>没有搜索到与 {{this.$route.params.id}} 相关的清单，换一个关键词试试</h2>
        <div v-show="listArr.length == 0" style="height: 30rem;"></div>
        <div class="row with_gutter">
          <div v-for="(item,index) of listArr" :key="item._id"
            class="column col-xs-12 col-sm-6 col-md-4 col-lg-4"
          >
            <nuxt-link :to="'/lists/' + item._id" class="list_shadow">
              <img :src="item.imgSrc" :alt="item.imgAlt" class="column_img">
              <div class="list_content">
                <h4>{{item.title}}</h4>
                <div class="iconfont icon_list">&#xe635;</div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import CommonFooter from '~/components/common/Footer'
export default {
  name: 'Collections',
  components: {
    CommonHeader,
    CommonFooter
  },
  data() {
    return {
      isHaveList: true
    }
  },
  async asyncData ({ app, params, error }) {
    return app.$axios.get('/api/tasks?keyword=' + params.id)
    .then((res) => {
      return {
        taskArr: res.data
      }
    })
    .catch((e) => {
      error({ statusCode: 404, message: '页面没有找到' })
    })
  },
  computed: {
    listArr() {
      if(this.taskArr) {
        return this.taskArr
      }else {
        return []
      }
    }
  },
  mounted() {
    if(this.listArr.length == 0) {
      this.isHaveList = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .body_min_width
    min-width: $minWidth
    @media (min-width: 89.9rem)
      .margin_medium
        margin: 10rem 8rem 0 8rem
    @media (max-width: 89.9rem)
      .margin_medium
        margin: 10rem 3.2rem 0 3.2rem
    .container_max_width
      max-width: $maxWidth
      margin: 0 auto
      .with_gutter
        margin-top: 4rem
        .column
          height: 41.8rem
          border-radius: $borderRadius
          margin: 1rem 0
          .list_shadow
            display: block
            box-shadow: 0 .2rem .6rem rgba(112,112,112,0.2)
            box-sizing: border-box
            text-decoration: none
            color: $darkTextColor
          .column_img
            display: block
            width: 100%
            min-height: 16.8rem
            object-fit: cover
          .list_content
            padding: 2rem
            min-height: 25rem
            h4
              font-weight: 500
            .icon_list
              font-size: 10rem
              width: 70%
              color: $grayTextColor
</style>
