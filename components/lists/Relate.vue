<template lang="html">
  <section class="section">
    <h4>相关推荐</h4>
    <div class="row with_gutter">
      <div v-for="(item,index) of listArr" :key="item.id"
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
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ListRelate',
  props: ['category'],
  data() {
    return {
      listArr: []
    }
  },
  methods: {
    handleGetInfo(res) {
      this.listArr = res.data.filter((item) => {
        return item._id != this.$route.params.id
      })
    }
  },
  mounted() {
    if(this.category !== undefined) {
      this.$axios.get('/api/tasks?category=' + this.category._id)
        .then(this.handleGetInfo).catch(reason => console.log(reason))  
    }
  }
}
</script>

<style lang="stylus" scoped>
  @media (min-width: 53.2rem)
    .section
      padding: 0 3rem
  .section
    margin: 0 auto
    margin-top: 5rem
    max-width: $maxWidth
    h4
      font-weight: $fontWeight
    .column
      margin: 1rem 0
      height: 41.8rem
      border-radius: $borderRadius
      .list_shadow
        display: block
        box-shadow: 0 .2rem .6rem rgba(112,112,112,0.2)
        box-sizing: border-box
        text-decoration: none
        color: $darkTextColor
        .column_img
          display: block
          width: 100%
          height: 18rem
          object-fit: cover
        .list_content
          padding: 2rem
          min-height: 12rem
          h4
            font-weight: 500
          .icon_list
            font-size: 10rem
            width: 70%
            color: $grayTextColor
</style>
