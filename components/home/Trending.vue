<template lang="html">
  <div class="container-fluid margin_medium">
    <div class="container_center padding_top_large">
      <div class="container_title">
        <h2>共享清单</h2>
        <span @click="handleTrending" :class="isShow ? 'text_color' : ''">热门</span> |
        <span @click="handleNewTask" :class="isShow ? '' : 'text_color'">最新</span>
      </div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeTrending',
  props: ['taskArr'],
  data() {
    return {
      listArr: this.taskArr,
      isShow: true
    }
  },
  methods: {
    handleNewTask () {
      this.$axios.get('/api/tasks?new=1')
        .then((res) => this.listArr = res.data).catch(reason => console.log(reason))
      this.isShow = false
    },
    handleTrending () {
      this.$axios.get('/api/tasks?trending=1')
        .then((res) => this.listArr = res.data).catch(reason => console.log(reason))
      this.isShow = true
    }
  }
}
</script>

<style lang="stylus" scoped>
  @media (min-width: 89.9rem)
    .margin_medium
      margin: 0 5.8rem
  @media (max-width: 89.9rem)
    .margin_medium
      margin: 0 2.6rem
  .margin_medium
    background: transparent
    .container_center
      max-width: $maxWidth
      margin: 0 auto
    .padding_top_large
      padding-top: 1rem
      .container_title
        color: $darkTextColor
        h2
          display: inline-block
          font-weight: $fontWeight
          font-size: 2rem
        span
          cursor: pointer
        .text_color
          color: red
      .column
        margin: 1rem 0
        height: 41.8rem
        border-radius: .2rem
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
            min-height: 25rem
            h4
              font-weight: 500
            .icon_list
              font-size: 10rem
              width: 70%
              color: $grayTextColor
</style>
