<template lang="html">
  <div class="container-fluid margin_medium">
    <div class="container_wrapper">
      <h3 style="text-align: center;">Publisher benefits</h3>
      <p style="text-align: center;">Besides becoming a total rockstar, there are so many benefits to being a publisher.</p>
      <div class="prev_desc">
        <img class="img-responsive" src="https://as.ftcdn.net/r/v1/pics/a014e23bc2f86a494c2eb15c032c51a3b120c2d7/home/open-in.jpg" alt="">
      </div>

      <div class="row next_desc">
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
          <h3>Here's an example of a published checklist and a few of the many benefits.</h3>
          <p>
            ✓ Rank in Google Search<br>
            ✓ It's super fast to publish<br>
            ✓ Checklists are interactive<br>
            ✓ Personalize options<br>
            ✓ Link to your website<br>
            ✓ Drive traffic and leads to your site<br>
            <br>
            ✓ Track views<br>
            ✓ Track PDFs downloaded<br>
            ✓ Track # of copies made<br>
            ✓ Easily share on social media
          </p>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <img class="img-responsive" src="https://as.ftcdn.net/r/v1/pics/a6bbebc616533491f17aff232d4f13856d164870/home/in-app.jpg" alt="">
        </div>
      </div>
      <!-- <button>Become a publisher</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePublish'
}
</script>

<style lang="stylus" scoped>
  .margin_medium
    margin: 2rem 6.4rem 0 6.4rem
    .container_wrapper
      margin: 0 auto
      width: 100%
      padding: 0 2rem
      .prev_desc
        margin: 0 auto
        width: 80%
        padding: 2rem 0
        img
          object-fit: cover
          max-height: 40rem
      .next_desc
        margin: 0 auto
        width: 80%
        img
          object-fit: cover
          max-height: 40rem
      // button
      //   display: block
      //   margin: 2rem auto
      //   width: 20rem
      //   background: #05a081
      //   border-radius: .2rem
      //   color: #fff
      //   padding: 1.2rem 0
</style>
