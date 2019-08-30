<template lang="html">
  <section class="section">
    <h4>Related Checklists</h4>
    <div class="row with_gutter">
      <div v-for="(item,index) of imgs" :key="item.id"
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
  </section>
</template>

<script>
export default {
  name: 'ListRelate',
  data() {
    return {
      imgs: [{
        id: "0001",
        title: "travel",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      }, {
        id: "0002",
        title: "education",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0003",
        title: "work",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      }]
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
    max-width: 130rem
    h4
      font-weight: 600
    .column
      margin: 1rem 0
      height: 41.8rem
      border-radius: .2rem
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
          min-height: 12rem
          h4
            font-weight: 500
          .icon_list
            font-size: 10rem
            width: 70%
            color: #d3d3d3
</style>
