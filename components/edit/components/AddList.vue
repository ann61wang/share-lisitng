<template lang="html">
  <li ref="list"
    :class="liClassName"
    @mouseenter="liMouseEnter"
    @mouseleave="liMouseLeave"
    @keydown.13.prevent="handleAddLi"
  >
    <transition name="fade">
      <span class="iconfont icon_drag" v-show="show">&#xe655;</span>
    </transition>
    <input type="checkbox" class="input_checkbox" :id="this.index">
    <label :for="this.index" v-show="!subTitle && !numMaker && boxShow"><span></span></label>
    <div contenteditable="true" :class="inputClassName" v-text="content" @blur="content = $event.target.innerText"></div>
    <transition-group name="fade">
      <span class="iconfont icon_more" v-show="show" @click="isShow=true" key="nowIndex">&#xe73a;</span>
      <div v-show="isShow" class="choice_wrapper" @mouseleave="isShow=false" key="nowIndex+1">
        <div v-for="(item,index) in items"
          @mouseenter="item.fixed = true"
          @mouseleave="item.fixed = false"
          @click="handleIconClick(index)"
          :key="item.desc"
          :class="item.fixed ? 'choice_btn choice_background' : 'choice_btn'"
        >
          {{item.desc}}<span class="iconfont" v-html="item.icon"></span>
        </div>
      </div>
    </transition-group>
  </li>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'EditAddList',
  props: ['index', 'id'],
  data() {
    return {
      nowIndex: 0,
      show: false,
      isShow: false,
      numMaker: false,
      subTitle: false,
      boxShow: true,
      inputText: true,
      content: '',
      items: [{
        desc: '重要', icon: '&#xe61f;', fixed: false
      },{
        desc: '副标题', icon: '&#xe60a;', fixed: false
      },{
        desc: '删除', icon: '&#xe615;', fixed: false
      }],
      liClassName: {
        draggable: true,
        list_maker: false,
        break: false,
        li_background: false,
        margin_top: false
      }
    }
  },
  methods: {
    liMouseEnter() {
      this.show = true
      this.liClassName.li_background = true
    },
    liMouseLeave() {
      this.show = false
      this.liClassName.li_background = false
    },
    handleAddLi() {
      this.$emit('handle-add')
    },
    handleRemoveLi() {
      this.$emit('handle-remove')
    },
    handleSubtitle() {
      this.subTitle = !this.subTitle
      if(this.subTitle) {
        this.liClassName.break = true
        this.liClassName.list_maker = false
        if(this.index != 0) this.liClassName.margin_top = true
      }else {
        this.liClassName.margin_top = false
        if(this.numMaker) this.liClassName.list_maker = true
        this.liClassName.break = false
      }
    },
    handleNumMaker() {
      this.numMaker = !this.numMaker
      this.liClassName.list_maker = (this.numMaker && !this.subTitle) ? true : false
    },
    handleBoxShow() {
      this.boxShow = !this.boxShow
    },
    handleIconClick(index) {
      switch (index) {
        case 0:
          this.inputText = !this.inputText
          break;
        case 1:
          this.handleSubtitle()
          break;
        case 2:
          this.handleRemoveLi()
          break;
        default:
          return
      }
    },
    ...mapMutations({
      syncLabelShow: 'sessionStorage/syncLabelShow',
      syncContent: 'sessionStorage/syncContent'
    })
  },
  computed: {
    contentObj() {
      return {
        id: String(this.id),
        content: this.content
      }
    },
    inputClassName: {
      get() {
        if(!this.subTitle) {
          return this.inputText ? 'input_list' : 'input_list input_text'
        }else {
          return this.subTitle ? 'input_list input_subtitle' : 'input_list'
        }
      },
      set(val) {}
    },
    ...mapState({
      listCache: state => state.sessionStorage.listCache,
      labelShow: state => state.sessionStorage.labelShow,
      contentCache: state => state.sessionStorage.content
    }),
    labelShowObj() {
      return {
        subTitle: this.subTitle,
        numMaker: this.numMaker,
        boxShow: this.boxShow
      }
    }
  },
  watch: {
    content() {
      this.syncContent(this.contentObj)
    },
    subTitle() {
      this.syncLabelShow(this.labelShowObj)
    },
    numMaker() {
      this.syncLabelShow(this.labelShowObj)
    },
    boxShow() {
      this.syncLabelShow(this.labelShowObj)
    }
  },
  mounted() {
    if(this.id < this.listCache.length) {
      this.content = this.listCache[this.index].content
      // this.liClassName = this.listData[this.index].liClassName
      // this.inputClassName = this.listData[this.index].spanClassName
      this.subTitle = this.listCache[this.index].labelShow.subTitle
      this.numMaker = this.listCache[this.index].labelShow.numMaker
      this.boxShow = this.listCache[this.index].labelShow.boxShow
    }
    this.syncLabelShow(this.labelShowObj)
  },
  activated() {
    if(this.id === 0) {
      this.content = this.listCache[0].content
      this.syncLabelShow(this.labelShowObj)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list_maker::before
    content: counter(item)
    padding: .3rem 2rem .3rem .8rem
    background: linear-gradient(to right, #f36, #f09)
    font-size: 1.5rem
    clip-path: polygon(0% 0%, 75% 0, 75% 51%, 100% 52%, 75% 80%, 75% 100%, 0 100%)
    border-radius: .5rem
    color: #fff
    text-shadow: .1rem .1rem .1rem rgba(#09f, .5)
  .break
    counter-reset: item -1
  .li_background
    background: rgba(0,225,200,.2)
  .margin_top
    margin-top: 3rem
  li
    counter-increment: item
    position: relative
    margin-bottom: 1rem
    transition: background .4s ease-in-out
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
      border-radius: $borderRadius
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
      width: calc(100% - 5.3rem)
      min-height: 3rem
      line-height: 3rem
      vertical-align: top
      margin-top: -.2rem
      outline: none
      border: none
      padding: 0 .2rem
    .input_list:empty:before
      content: '输入文字'
      color: #A6A8AB
    .input_list:focus:before
      content: none
    .input_text
      font-weight: $fontWeight
      color: red
    .input_subtitle
      font-size: 1.8rem
      font-weight: $fontWeight
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
      background: $bgGrayColor
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
