<template lang="html">
  <div class="container-fluid margin_medium">
    <div class="container_center padding_top_large">
      <div class="container_title"><h2>Share Listing</h2> Trending | New </div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeTrending',
  data() {
    return {
      imgs: [{
        id: "0001",
        title: "travel",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0002",
        title: "education",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0003",
        title: "life",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0004",
        title: "work",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0005",
        title: "study",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0006",
        title: "happy",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0007",
        title: "book",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0008",
        title: "movie",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0009",
        title: "baby",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
     }]
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
      width: 100%
      margin: 0 auto
    .padding_top_large
      padding-top: 1rem
      .container_title
        color: #333
        h2
          display: inline-block
          font-weight: 600
          font-size: 2rem
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
            min-height: 25rem
            h4
              font-weight: 500
            .icon_list
              font-size: 10rem
              width: 70%
              color: #d3d3d3
</style>
