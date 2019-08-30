<template lang="html">
  <div>
    <common-header></common-header>
    <div class="container-fluid margin_medium">
      <div class="container_max_width">
        <h2>{{title}}</h2>
        <div class="row with_gutter">
          <div v-for="(item,index) of collection" :key="item.id"
            class="column col-xs-12 col-sm-6 col-md-4 col-lg-4"
          >
            <nuxt-link :to="'/lists/' + item.id" class="list_shadow">
              <img :src="item.imgUrl" alt="" class="column_img">
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
import axios from 'axios'
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
      title: '',
      collection: []
    }
  },
  methods: {
    getCollectionInfo() {
      axios.get('/api/collections.json', {
        params: {
          id: this.$route.params.id
        }
      }).then(this.handleGetDataSucc)
    },
    handleGetDataSucc(res) {
      res = res.data
      if(res.ret && res.data) {
        const data = res.data
        this.title = data.title
        this.collection = data.collection
      }
    }
  },
  mounted() {
    this.getCollectionInfo()
  }
}
</script>

<style lang="stylus" scoped>
  @media (min-width: 89.9rem)
    .margin_medium
      margin: 10rem 8rem 0 8rem
  @media (max-width: 89.9rem)
    .margin_medium
      margin: 10rem 3.2rem 0 3.2rem
  .container_max_width
    max-width: 130rem
    margin: 0 auto
    .with_gutter
      margin-top: 4rem
      .column
        height: 41.8rem
        border-radius: .2rem
        margin: 1rem 0
        .list_shadow
          display: block
          box-shadow: 0 .2rem .6rem rgba(112,112,112,0.2)
          box-sizing: border-box
          text-decoration: none
          color: #333
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
            color: #d3d3d3
</style>
