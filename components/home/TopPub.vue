<template lang="html">
  <div class="container-fluid padding_size wrapper">
    <h3 style="text-align: center;">活跃的创作者</h3>
    <p style="text-align: center;">从他们的作品中寻求灵感</p>
    <div class="columns row">
      <nuxt-link tag="div" to="/user/admin" class="column col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <div class="column_img">
          <img class="column_img_content" src="https://sharelist-1255748781.cos.ap-guangzhou.myqcloud.com/felix-mittermeier-366.jpeg" alt="">
        </div>
        <p class="column_name">admin</p>
      </nuxt-link>
      <nuxt-link tag="div" to="/user/liuyi" class="column col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <div class="column_img column_size">
          <img class="column_img_content" src="https://sharelist-1255748781.cos.ap-guangzhou.myqcloud.com/felix-mittermeier-366.jpeg" alt="">
        </div>
        <p class="column_name">liuyi</p>
      </nuxt-link>
      <nuxt-link tag="div" to="/user/tanlulu" class="column col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <div class="column_img column_size">
          <img class="column_img_content" src="https://sharelist-1255748781.cos.ap-guangzhou.myqcloud.com/felix-mittermeier-366.jpeg" alt="">
        </div>
        <p class="column_name">tanlulu</p>
      </nuxt-link>
      <nuxt-link tag="div" to="/user/wang" class="column col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <div class="column_img column_size">
          <img class="column_img_content" src="https://sharelist-1255748781.cos.ap-guangzhou.myqcloud.com/felix-mittermeier-366.jpeg" alt="">
        </div>
        <p class="column_name">wang</p>
      </nuxt-link>

    </div>
    <p style="text-align: center;">制作简单的清单给更多人使用</p>
    <nuxt-link to="/write" class="btn btn-default btn-block my_btn">成为创作者</nuxt-link>
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
    margin: 0 auto
    max-width: $maxWidth
    .columns
      margin: 4rem 0
      .column
        display: inline-block
        box-sizing: border-box
        .column_img
          box-sizing: border-box
          margin: 0 auto
          height: 7rem
          width: 7rem
          .column_img_content
            display: block
            margin: 0 auto
            border-radius: 50%
            width: 100%
            height: 100%
            object-fit: cover
        .column_name
          margin-top: 2rem
          text-align: center
    .my_btn
      margin: 2rem auto
      max-width: 20rem
      background: $bgBtnColor
      color: $whiteTextColor
      padding: 1.2rem 0
</style>
