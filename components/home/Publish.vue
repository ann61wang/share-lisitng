<template lang="html">
  <div class="container-fluid margin_medium container_max_width">
    <div class="container_wrapper">
      <h3 style="text-align: center;">创作者的好处</h3>
      <p style="text-align: center;">成为一个创作者有很多的好处</p>
      <div class="prev_desc">
        <img class="img-responsive" src="https://as.ftcdn.net/r/v1/pics/a014e23bc2f86a494c2eb15c032c51a3b120c2d7/home/open-in.jpg" alt="">
      </div>

      <div class="row next_desc">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
          <h3>这是一个已发布的清单示例，以及其中的一些好处</h3>
          <p>
            ✓ 百度搜索中排名靠前<br>
            ✓ 非常快地速度就可以发布一个清单<br>
            ✓ 清单是交互式的<br>
            ✓ 可以个性化定制清单<br>
            ✓ 链接到你的网站或者文章<br>
            ✓ 为你的站点增加流量<br>
            <br>
            ✓ 视图追踪<br>
            ✓ 追踪清单被复制的数量<br>
            ✓ 非常容易分享到社交媒体<br>
          </p>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <img class="img-responsive" src="https://sharelist-1255748781.cos.ap-guangzhou.myqcloud.com/Snip20191002_15" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePublish'
}
</script>

<style lang="stylus" scoped>
  .container_max_width
    max-width: 110rem
    margin: 4rem auto
    .container_wrapper
      margin: 0 auto
      width: 100%
      padding: 0 2rem
      .prev_desc
        margin: 0 auto
        padding: 2rem 0
        img
          object-fit: cover
          max-height: 40rem
      .next_desc
        margin: 0 auto
        width: 100%
        img
          object-fit: cover
          max-height: 40rem
</style>
