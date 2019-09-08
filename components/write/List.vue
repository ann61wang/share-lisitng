<template lang="html">
  <div>
    <div class="editable_toolbar">
      <div class="editable_toolbar_controls">
        <button class="btn iconfont btn-default icon_btn" @click.prevent="handleNumClick" title="切换标记符">&#xe62e;</button>
        <button class="btn iconfont btn-default icon_btn" @click="handleBoxClear" title="显示隐藏">&#xe696;</button>
        <button class="btn iconfont btn-default icon_btn" title="字体样式" style="color: #777;">&#xe662;</button>
        <button class="btn iconfont btn-default icon_btn" title="字体颜色" style="color: #777;">&#xe667;</button>
        <button class="btn iconfont btn-default icon_btn" @click="handleClearAll" title="全部删除" style="color: #666;">&#xe612;</button>
        <button class="btn iconfont btn-default icon_btn" @click="isPicName = true" title="添加图名">&#xe6ed;</button>
      </div>
    </div>
    <div class="clear_confirm" v-show="isClearAll">
      <div class="iconfont icon_cancel" @click="isClearAll = false" title="取消">&#xe604;</div>
      <div class="content_confirm">确认要删除全部清单么？</div>
      <button class="btn btn-default btn-block icon_clear" @click="clearComfirm">确认</button>
    </div>
    <div class="picture_name" v-show="isPicName">
      <div class="iconfont name_cancel" title="取消" @click="isPicName = false">&#xe604;</div>
      <input type="text" class="input_name" placeholder="添加适合的图片名称可以提高百度排名" v-model="inputValue">
      <button class="btn btn-default btn-block name_submit" @click="handleNameSubmit">添加</button>
    </div>
    <draggable tag="ul"
      class="list_checkboxes"
      v-model="items"
      v-bind="dragOptions"
      @start="isDragging=true"
      @end="idDragging=false"
    >
      <transition-group>
        <component :is="item.component"
          ref="list"
          v-for="(item,index) in items"
          :key="item.id"
          @handle-add="add(index, 'add-list')"
          @handle-remove="remove(index)"
          :index="index"
        >
        </component>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import AddList from '~/components/write/components/AddList'
import draggable from 'vuedraggable'
export default {
  name: 'WriteList',
  components: {
    AddList,
    draggable
  },
  data() {
    return {
      count: 0,
      isDragging: false,
      isNumMaker: false,
      isClearAll: false,
      isPicName: false,
      inputValue: '',
      items: [{component: 'add-list', id: 0}]
    }
  },
  methods: {
    add: async function (index,name) {
      this.count++
      this.items.splice(index+1, 0, { component: name, id: this.count })
      await this.$nextTick()
      $(".input_list")[index+1].focus()
      if(this.isNumMaker) {
        let len = this.$refs.list.length
        this.$refs.list[len-1].handleNumMaker()
      }
    },
    remove(index) {
      if(this.items.length > 1) {
        this.items.splice(index,1)
      }
    },
    handleNumClick() {
      this.$refs.list.forEach(function(item) {
        if(!item.subTitle) {
          setTimeout(function() {
            item.$el.classList.add('break')
            item.$el.classList.remove('list_maker')
          }, 1)
        }
        item.handleNumMaker()
      })
      this.isNumMaker = !this.isNumMaker
    },
    handleBoxClear() {
      if(!this.isNumMaker) this.$refs.list.forEach((item) => item.handleBoxShow())
    },
    handleClearAll() {
      this.isClearAll = true
    },
    clearComfirm() {
      this.items = [{component: 'add-list', id: 0}]
      this.isClearAll = false
    },
    handleNameSubmit() {
      this.isPicName = false
      this.inputValue = ''
    }
  },
  computed: {
    dragOptions() {
      return {
        group: "lists",
        draggable: ".draggable",
        handle: ".icon_drag",
        ghostClass: "ghostClass",
        animation: 500
      }
    }
  },
  watch: {
    isPicName() {
     if(this.isPicName) this.$nextTick(() => $(".input_name").focus())
    }
  }
}
</script>

<style lang="stylus" scoped>
  .editable_toolbar
    border-top: .1rem solid #ebebeb
    border-bottom: .1rem solid #ebebeb
    .editable_toolbar_controls
      display: flex
      align-items: center
      justify-content: space-between
      padding: .5rem 1.3rem
      .icon_btn
        border: none
        outline: none
  .clear_confirm
    position: fixed
    top: 35%
    left: 0
    z-index: 33
    background: #ffeeee
    height: 15rem
    width: 100%
    .icon_cancel
      position: absolute
      top: .5rem
      left: 50% + 13rem
      cursor: pointer
      font-size: 2.6rem
      color: red
    .content_confirm
      text-align: center
      font-size: 1.6rem
      margin-top: 4rem
      margin-bottom: 2rem
      color: red
    .icon_clear
      margin: 0 auto
      width: 30%
      cursor: pointer
      border: none
      outline: none
  .picture_name
    position: fixed
    top: 35%
    left: 0
    z-index: 32
    background: #ffeeee
    height: 15rem
    width: 100%
    .name_cancel
      position: absolute
      top: .5rem
      left: 50% + 13rem
      cursor: pointer
      font-size: 2.6rem
      color: red
    .input_name
      display: block
      width: 30%
      text-decoration: none
      border: none
      outline: none
      height: 3rem
      margin: 0 auto
      margin-top: 4rem
      margin-bottom: 2rem
      padding: .2rem 1rem
    .name_submit
      margin: 0 auto
      width: 30%
  .list_checkboxes
    margin-top: 4rem
    min-height: 3rem
    list-style-type: none
    word-wrap: break-word
    counter-reset: item
    .ghostClass
      opacity: .2
      background: red
    .break
      counter-reset: item -1
    .list_maker::before
      content: counter(item)
      padding: .3rem 2rem .3rem .8rem
      background: linear-gradient(to right, #f36, #f09)
      font-size: 1.5rem
      clip-path: polygon(0% 0%, 75% 0, 75% 51%, 100% 52%, 75% 80%, 75% 100%, 0 100%)
      border-radius: .5rem
      color: #fff
      text-shadow: .1rem .1rem .1rem rgba(#09f, .5)
</style>
