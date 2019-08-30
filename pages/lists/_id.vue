<template lang="html">
  <div>
    <common-header></common-header>
    <div class="container-fluid list_page">
      <list-follow></list-follow>
      <list-main></list-main>
      <div style="height: 60rem;">Related Checklists</div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import ListFollow from '~/components/lists/Follow'
import ListMain from '~/components/lists/Main'
export default {
  name: 'Lists',
  components: {
    CommonHeader,
    ListFollow,
    ListMain
  }
}
</script>

<style lang="stylus" scoped>
  .list_page
    margin: 5.8rem 6rem 0 6rem
</style>
