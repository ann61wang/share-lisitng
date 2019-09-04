<template lang="html">
  <li class="draggable"
    @mouseover="handleLiMouseEnter"
    @mouseout="handleLiMouseLeave"
    @keydown.13.prevent="handleAddLi"
  >
    <transition name="fade">
      <span class="iconfont icon_drag" v-show="show" @mouseenter="handleIconDrag" @mouseleave="handleIconUndrag">&#xe655;</span>
    </transition>
    <input type="checkbox" class="input_checkbox" :id="this.index">
    <label :for="this.index"><span></span></label>
    <div contenteditable="true" class="input_list"></div>
    <span class="iconfont">&#xe61f;</span>
    <span class="iconfont" @click="handleRemoveLi" style="color: red;">&#xe612;</span>
  </li>
</template>

<script>
export default {
  name: 'AddList',
  props: ['index'],
  data() {
    return {
      nowIndex: 0,
      show: false
    }
  },
  methods: {
    handleLiMouseEnter() {
      this.show = true
    },
    handleLiMouseLeave() {
      this.show = false
    },
    handleAddLi() {
      this.$emit('handle-add')
    },
    handleRemoveLi() {
      this.$emit('handle-remove')
    },
    handleIconDrag() {
      $( ".sortable" ).sortable({
        cursor: 'move',
        items: '.draggable',
        opacity: 0.6,
        axis: 'y',
        handel: 'icon_drag',
        containment: 'parent'
      })
      $(".sortable").sortable('enable')
    },
    handleIconUndrag() {
      if($(".sortable").sortable())
        $(".sortable").sortable('disable')
    }
  }
}
</script>

<style lang="stylus" scoped>
  li
    counter-increment: item
    position: relative
    margin-bottom: 1rem
    // &::before
    //   content: counter(item)
    //   padding: .5rem 3rem .5rem 1.2rem
    //   background: linear-gradient(to right, #f36, #f09)
    //   font-size: 2rem
    //   clip-path: polygon(0% 0%, 75% 0, 75% 51%, 100% 52%, 75% 65%, 75% 100%, 0 100%)
    //   border-radius: .5rem
    //   color: #fff
    //   text-shadow: .1rem .1rem .1rem rgba(#09f, .5)
    .icon_drag
      position: absolute
      left: -2rem
    .fade-enter, .fade-leave-to
      opacity: 0
    .fade-enter-active, .fade-leave-active
        transition: opacity 1s
    .input_checkbox
      display: none
    label
      display: inline-block
      width: 20px
      height: 20px
      margin-right: 5px
      vertical-align: middle
      border: .1rem solid #999
      border-radius: .2rem
    input[type="checkbox"]:checked+label>span
      display: block
      width: .6rem
      height: 1.2rem
      border-color: #666
      border-style: solid
      border-width: 0 .2rem .3rem 0
      transform: rotate(45deg)
      margin-left: .6rem
      margin-top: .1rem
    .input_list
      display: inline-block
      width: calc(100% - 8rem)
      min-height: 3rem
      line-height: 3rem
      vertical-align: top
      margin-top: -.2rem
      outline: none
      border: none
      padding: 0 .2rem
</style>
