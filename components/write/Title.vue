<template lang="html">
  <div>
    <div class="wrapper" @mouseenter="handleDivMouseEnter" @mouseleave="handleDivMouseLeave">
      <label class="uploade_picture" for="picture">
        <input type="file" accept=".jpeg .jpg .png" class="uploade_picture_input" id="picture">
        <div class="iconfont icon_camera">&#xe60b;</div>
        <transition name="fade">
          <div class="text" v-show="show">添加题图</div>
        </transition>
      </label>
    </div>
    <div class="input_wrapper">
      <textarea rows="1" spellcheck="false" placeholder="请输入标题（最多输入30字）" class="input_title"></textarea>
    </div>
    <div class="input_wrapper">
      <textarea rows="2" spellcheck="false" placeholder="描述你的清单（最多输入100字)" class="input_description"></textarea>
    </div>
    <div class="editable_toolbar">
      <div class="editable_toolbar_controls">
        <button class="btn">btn</button>
        <button class="btn">btn</button>
        <button class="btn">btn</button>
        <button class="btn">btn</button>
        <button class="btn">btn</button>
        <button class="btn">btn</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WriteTitle',
  data() {
    return {
      show: false
    }
  },
  methods: {
    handleDivMouseEnter() {
      this.show = true
    },
    handleDivMouseLeave() {
      this.show = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    margin: 10rem auto 0
    cursor: pointer
    max-width: 66rem
    min-height: 19.2rem
    position: relative
    border-radius: .2rem
    background: #f6f6f6
    .uploade_picture
      display: block
      line-height: 19.2rem
      min-height: 19.2rem
      text-align: center
      cursor: pointer
      .uploade_picture_input
        display: none
      .icon_camera
        margin: 0 auto
        width: 4.2rem
        height: 4.2rem
        font-size: 4.6rem
        color: rgba(26,26,26,.2)
      .fade-enter, .fade-leave-to
        opacity: 0
      .fade-enter-active, .fade-leave-active
          transition: opacity 1s
      .text
        position: absolute
        width: 100%
        text-align: center
        left: 0
        bottom: 5rem
        line-height: 1
        color: grey
  .input_wrapper
    margin: 1.6rem 0
    padding: 0
    height: auto
    width: 100%
    position: relative
    display: flex
    background: #fff
    .input_title
      display: block
      flex: 1 1
      padding: 0
      resize: none
      min-height: 4.4rem
      width: 100%
      border: 0
      font-size: 3.2rem
      line-height: 1.4
      font-weight: $fontWeight
      font-synthesis: style
      outline: none
      color: $darkTextColor
    .input_description
      display: block
      flex: 1 1
      padding: 0
      resize: none
      min-height: 4.4rem
      width: 100%
      border: 0
      font-size: 1.6rem
      line-height: 1.4
      font-weight: $fontWeight
      font-synthesis: style
      outline: none
      color: #555
  .editable_toolbar
    border-top: .1rem solid #ebebeb
    border-bottom: .1rem solid #ebebeb
    .editable_toolbar_controls
      display: flex
      align-items: center
      padding: .5rem 1.3rem
</style>
