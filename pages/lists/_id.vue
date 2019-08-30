<template lang="html">
  <div>
    <common-header></common-header>
    <div class="container-fluid list_page">
      <list-follow></list-follow>
      <list-main></list-main>
      <list-relate></list-relate>
    </div>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import ListFollow from '~/components/lists/Follow'
import ListMain from '~/components/lists/Main'
import ListRelate from '~/components/lists/Relate'
export default {
  name: 'Lists',
  components: {
    CommonHeader,
    ListFollow,
    ListMain,
    ListRelate
  }
}
</script>

<style lang="stylus" scoped>
  .list_page
    margin: 5.8rem 6rem 0 6rem
</style>
