<template lang="html">
  <div class="body_min_width">
    <common-header></common-header>
    <div class="container-fluid wrapper">
      <write-title ref="title"></write-title>
      <write-list @clearTitle="handleClearTitle"></write-list>
    </div>
    <div class="margin"></div>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import WriteTitle from '~/components/write/Title'
import WriteList from '~/components/write/List'

export default {
  name: 'Write',
  components: {
    CommonHeader,
    WriteTitle,
    WriteList
  },
  methods: {
    handleClearTitle() {
      this.$refs.title.titleValue = ''
      this.$refs.title.descValue = ''
    }
  },
  mounted() {
    localStorage.listMessage = {}
  }
}
</script>

<style lang="stylus" scoped>
  .body_min_width
    min-width: $minWidth
    .wrapper
      max-width: 66rem
    .margin
      height: 60rem
</style>
