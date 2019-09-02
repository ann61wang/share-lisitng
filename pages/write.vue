<template lang="html">
  <div class="body_min_width">
    <common-header></common-header>
    <div class="container-fluid wrapper">
      <write-title></write-title>
    </div>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import WriteTitle from '~/components/write/Title'
export default {
  name: 'Write',
  components: {
    CommonHeader,
    WriteTitle
  }
}
</script>

<style lang="stylus" scoped>
  .body_min_width
    min-width: $minWidth
    .wrapper
      max-width: 66rem
</style>
