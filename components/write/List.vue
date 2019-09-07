<template lang="html">
  <div>
    <div class="editable_toolbar">
      <div class="editable_toolbar_controls">
        <button class="btn iconfont" @click.prevent="handleNumClick" title="切换标记符">&#xe62e;</button>
        <button class="btn">btn</button>
        <button class="btn">btn</button>
        <button class="btn">btn</button>
        <button class="btn">btn</button>
        <button class="btn">btn</button>
      </div>
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
