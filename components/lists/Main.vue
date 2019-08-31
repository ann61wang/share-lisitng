<template lang="html">
  <section class="section_max_width">
    <div class="wrapper">
      <h1 class="section_title_large">Live Listing: How to Make a Checklist on Facebook Go Viral!</h1>
      <p class="description">Get your Facebook followers and friends to engage with you, your brand, or business, by asking for their advice and help completing your checklist.</p>
      <div class="section_img">
        <img src="https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500" alt="">
      </div>
      <ul class="list_checkboxes">
        <li class="panel">Pick an easy checklist topic and title so everyone can share ideas (50 Places to Visit, things to do,etc)</li>
        <li class="panel">Pick an easy checklist topic and title so everyone can share ideas (50 Places to Visit, things to do,etc)</li>
        <li class="panel">Pick an easy checklist topic and title so everyone can share ideas (50 Places to Visit, things to do,etc)</li>
        <li class="panel">Pick an easy checklist topic and title so everyone can share ideas (50 Places to Visit, things to do,etc)</li>
        <li class="panel">Pick an easy checklist topic and title so everyone can share ideas (50 Places to Visit, things to do,etc)</li>
        <li class="panel">Pick an easy checklist topic and title so everyone can share ideas (50 Places to Visit, things to do,etc)</li>
        <li class="panel">Pick an easy checklist topic and title so everyone can share ideas (50 Places to Visit, things to do,etc)</li>
        <li class="panel">Pick an easy checklist topic and title so everyone can share ideas (50 Places to Visit, things to do,etc)</li>
      </ul>
      <button class="btn btn-default collect_btn">Copy this checklist</button>
      <div class="level">
        <nuxt-link class="level_item" to="/"><span class="iconfont">&#xe62c;</span>  174 copies saved<span class="spacer"></span></nuxt-link>
        <nuxt-link class="level_item" to="/"><span class="iconfont">&#xe62b;</span>  979 views</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ListMain'
}
</script>

<style lang="stylus" scoped>
  .section_max_width
    max-width: 80rem
    margin: 0 auto
    .section_title_large
      text-align: center
    .description
      text-align: center
      font-size: 2rem
      margin-top: 1rem
    .section_img
      width: 100%
      height: 30rem
      margin: 3rem 0
      img
        width: 100%
        height: 100%
        display: block
        object-fit: cover
    .list_checkboxes
      background: transparent
      .panel
        list-style: none
        margin-left: -3rem
        margin-bottom: 3rem
        font-size: 1.6rem
        font-weight: 500
    .collect_btn
      display: block
      margin: 0 auto
      margin-top: 10rem
      margin-bottom: 1.6rem
      padding: 1rem 4rem
      background: $bgBtnColor
      color: $whiteTextColor
      font-size: $fontSize
      font-weight: $fontWeight
    .level
      margin: 0 auto
      width: 24rem
      .level_item
        text-decoration: none
        color: #666
        .spacer
          margin-right: 1.6rem
</style>
