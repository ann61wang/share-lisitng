<template lang="html">
  <div class="container-fluid wrapper padding_size">
    <h3 style="text-align: center;">Top Pulisher</h3>
    <p style="text-align: center;">Take inspiration from their work</p>
    <div class="columns row">
      <nuxt-link tag="div" to="/" class="column col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <div class="column_img column_size">
          <img class="column_img_content" src="https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500" alt="">
        </div>
        <p class="column_name">Jacob Lund</p>
      </nuxt-link>
      <nuxt-link tag="div" to="/" class="column col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <div class="column_img column_size">
          <img class="column_img_content" src="https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500" alt="">
        </div>
        <p class="column_name">Jacob Lund</p>
      </nuxt-link>
      <nuxt-link tag="div" to="/" class="column col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <div class="column_img column_size">
          <img class="column_img_content" src="https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500" alt="">
        </div>
        <p class="column_name">Jacob Lund</p>
      </nuxt-link>
      <nuxt-link tag="div" to="/" class="column col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <div class="column_img column_size">
          <img class="column_img_content" src="https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500" alt="">
        </div>
        <p class="column_name">Jacob Lund</p>
      </nuxt-link>

    </div>
    <p style="text-align: center;">Make simple lists for more people to use</p>
    <button class="my_btn">Become a publisher</button>
  </div>
</template>

<script>
export default {
  name: 'HomeTopPub'
}
</script>

<style lang="stylus" scoped>
  @media (min-width: 89.9rem)
    .padding_size
      padding: 0 5.8rem
  @media (max-width: 89.9rem)
    .padding_size
      padding: 0 2.6rem
  .wrapper
    margin-top: 4rem
    .columns
      margin: 4rem 0
      .column
        display: inline-block
        box-sizing: border-box
        @media (max-width: 30rem)
          .column_size
            height: 7rem
            width: 7rem
        @media (min-width: 30rem)
          .column_size
            height: 14rem
            width: 14rem
        .column_img
          box-sizing: border-box
          margin: 0 auto
          .column_img_content
            display: block
            border-radius: 50%
            width: 100%
            height: 100%
        .column_name
          text-align: center
    .my_btn
      display: block
      margin: 2rem auto
      width: 20rem
      background: #05a081
      border-radius: .2rem
      color: #fff
      padding: 1.2rem 0
</style>
