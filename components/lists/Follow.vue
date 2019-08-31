<template lang="html">
  <section class="row list_page_section">
    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5 level_left">
      <nuxt-link to="/" class="user_info">
        <div class="user_img"><img src="https://images.pexels.com/users/avatars/344572/felix-mittermeier-366.jpeg?w=256&h=256&fit=crop&crop=faces" alt=""></div>
        <div class="user_message">
          <h3>Somebody</h3>
          <div class="follower_count"><span>794</span> followers</div>
        </div>
      </nuxt-link>
      <button class="btn btn-default follow_btn">Follow</button>
    </div>
    <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 level_right" style="text-align: right; line-height: 8rem;">
      <button class="btn btn-default right_btn"><span class="iconfont icon_style">&#xe61a;</span>  112 likes</button>
      <button class="btn btn-default right_btn"><span class="iconfont icon_style">&#xe603;</span>  Collect</button>
      <button class="btn btn-default right_btn"><span class="iconfont icon_style">&#xe626;</span>  Share</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ListFollow'
}
</script>

<style lang="stylus" scoped>
  .list_page_section
    margin: 2rem 0
    .user_info
      display: inline-block
      margin-right: 2rem
      vertical-align: -110%
      .user_img
        display: inline-block
        margin-right: 1rem
        width: 5.2rem
        height: 5.2rem
        img
          display: block
          border-radius: 50%
          width: 5rem
          height: 5rem
      .user_message
        display: inline-block
        max-width: 15rem
        text-decoration: none
        color: $darkTextColor
        vertical-align: 40%
        h3
          display: block
          line-height: 2.5rem
          font-size: 1.6rem
          font-weight: $fontWeight
          margin-bottom: 0
          ellipsis()
        .follower_count
          font-size: 1.6rem
          line-height: 2.5rem
          font-weight: 300
    .follow_btn
      display: inline-block
      padding: .6rem 1.3rem
      font-size: $fontSize
      font-weight: $fontWeight
      min-height: 3.2rem
      color: $darkTextColor
    .right_btn
      display: inline-block
      margin-right: .8rem
      margin-top: .5rem
      padding: .5rem 2rem
      color: $darkTextColor
      font-size: 1.6rem
      font-weight: $fontWeight
      white-space: nowrap
      .icon_style
        font-size: 2rem
        vertical-align: middle

</style>
