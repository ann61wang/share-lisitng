<template lang="html">
  <div>
    <common-header></common-header>
    <div class="container-fluid list_page">
      <list-follow></list-follow>
      <list-main></list-main>
      <list-relate></list-relate>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import ListFollow from '~/components/lists/Follow'
import ListMain from '~/components/lists/Main'
import ListRelate from '~/components/lists/Relate'
import CommonFooter from '~/components/common/Footer'
export default {
  name: 'Lists',
  components: {
    CommonHeader,
    ListFollow,
    ListMain,
    ListRelate,
    CommonFooter
  }
}
</script>

<style lang="stylus" scoped>
  @media (min-width: 53.2rem)
    .list_page
      margin: 5.8rem 6rem 0 6rem
  @media (max-width: 53.2rem)
    .list_page
      margin: 5.8rem 1.6rem 0 1.6rem
  .list_page
    min-width: 30rem
</style>
