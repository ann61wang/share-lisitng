<template lang="html">
  <div class="container-fluid wrapper">
    <div class="message">
      <p>关于我们 | 帮助中心 | 开放平台 | 诚聘英才 | 联系我们 | 网站合作 | 友情链接</p>
      <br>
      <p style="text-align: center;">Copyright ©2019 Share Lists Design by <nuxt-link tag="span" to='/'>王静如</nuxt-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonFooter'
}
</script>

<style lang="stylus" scoped>
  .wrapper
    margin-top: 4rem
    height: 25rem
    background: #232a34
    .message
      margin: 9rem auto
      max-width: 50rem
      color: #888
</style>
