<template lang="html">
  <li ref="list"
    :class="liShow ? 'draggable' : 'draggable li_background'"
    @mouseover="handleLiMouseOver"
    @mouseleave="handleLiMouseOut"
    @keydown.13.prevent="handleAddLi"
  >
    <transition name="fade">
      <span class="iconfont icon_drag" v-show="show">&#xe655;</span>
    </transition>
    <input type="checkbox" class="input_checkbox" :id="this.index">
    <label :for="this.index" v-show="subTitle"><span></span></label>
    <div contenteditable="true" :class="inputText ? 'input_list' : 'input_list input_text'" v-if="subTitle"></div>
    <div contenteditable="true" :class="subTitle ? 'input_list' : 'input_list input_subtitle'" v-else></div>
    <transition-group name="fade">
      <span class="iconfont icon_more" v-show="show" @click="isShow=true" key="nowIndex">&#xe73a;</span>
      <div v-show="isShow" class="choice_wrapper" @mouseleave="isShow=false" key="nowIndex+1">
        <div :class="iconOne ? 'choice_btn' : 'choice_btn choice_background'" @mouseenter="iconOne=false" @mouseleave="iconOne=true" @click="inputText = !inputText">重要<span class="iconfont">&#xe61f;</span></div>
        <div :class="iconTwo ? 'choice_btn' : 'choice_btn choice_background'" @mouseenter="iconTwo=false"  @mouseleave="iconTwo=true" @click="handleSubtitle">副标题<span class="iconfont">&#xe60a;</span></div>
        <div :class="iconThree ? 'choice_btn' : 'choice_btn choice_background'" @mouseenter="iconThree=false"  @mouseleave="iconThree=true" @click="handleRemoveLi">删除<span class="iconfont" style="color: red;">&#xe612;</span></div>
      </div>
    </transition-group>
  </li>
</template>

<script>
export default {
  name: 'AddList',
  props: ['index'],
  data() {
    return {
      nowIndex: 0,
      show: false,
      isShow: false,
      liShow: true,
      subTitle: true,
      iconOne: true,
      iconTwo: true,
      iconThree: true,
      inputText: true
    }
  },
  methods: {
    handleLiMouseOver() {
      this.show = true
      this.liShow = false
    },
    handleLiMouseOut() {
      this.show = false
      this.liShow = true
    },
    handleAddLi() {
      this.$emit('handle-add')
    },
    handleRemoveLi() {
      this.$emit('handle-remove')
    },
    handleSubtitle() {
      this.subTitle = !this.subTitle
      if(this.index != 0)
        this.$refs.list.style.marginTop = '3rem'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .li_background
    background: rgba(0,225,200,.2)
    transition: background .4s ease-in-out
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
      cursor: move
      left: -2rem
      top: .2rem
    .fade-enter, .fade-leave-to
      opacity: 0
    .fade-enter-active, .fade-leave-active
        transition: opacity 1s
    .input_checkbox
      display: none
    label
      display: inline-block
      width: 2rem
      height: 2rem
      margin-right: .5rem
      margin-top: .3rem
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
      width: calc(100% - 6rem)
      min-height: 3rem
      line-height: 3rem
      vertical-align: top
      margin-top: -.2rem
      outline: none
      border: none
      padding: 0 .2rem
    .input_list:empty:before
      content: '输入正文'
      color: #A6A8AB
    .input_list:focus:before
      content: none
    .input_text
      font-weight: 600
      color: red
    .input_subtitle
      font-size: 1.8rem
      font-weight: 600
    .icon_more
      cursor: pointer
      position: absolute
      right: 0
      top: .2rem
    .choice_wrapper
      min-width: 9rem
      min-height: 9rem
      box-shadow: 0 .2rem .6rem rgba(112,112,112,0.2)
      box-sizing: border-box
      background: #f6f6f6
      position: absolute
      right: -3rem
      top: .8rem
      z-index: 9
      padding: .5rem
      .choice_btn
        display: flex
        width: 100%
        justify-content: space-between
        margin-bottom: .6rem
        cursor: pointer
      .choice_background
        background: rgba(0,225,200,.5)
</style>
