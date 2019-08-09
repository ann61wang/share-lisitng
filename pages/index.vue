<template>
  <div class="">
    <home-header></home-header>
    <home-search></home-search>
  </div>
</template>

<script>
import HomeHeader from '~/components/home/Home'
import HomeSearch from '~/components/home/Search'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSearch
  }
}
</script>

<style lang="stylus" scoped>

</style>
