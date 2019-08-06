<template>
  <div class="">
    <home-header></home-header>
    <div class="content"></div>
  </div>
</template>

<script>
import HomeHeader from '~/components/home/Home'

export default {
  name: 'Home',
  components: {
    HomeHeader
  }
}
</script>

<style lang="stylus" scoped>
  .content
    background: green
<<<<<<< HEAD
    height: 100rem
=======
    height: 40rem
>>>>>>> home-header
</style>
