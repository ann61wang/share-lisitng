<template lang="html">
  <div>
    <draggable tag="ul"
      class="list_checkboxes"
      v-model="items"
      v-bind="dragOptions"
      @start="isDragging=true"
      @end="idDragging=false"
    >
      <transition-group>
        <component :is="item.component"
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
      items: [{component: 'add-list', id: 0}]
    }
  },
  methods: {
    add: async function (index,name) {
      this.count++
      this.items.splice(index+1, 0, { component: name, id: this.count })
      await this.$nextTick()
      $(".input_list")[index+1].focus()
    },
    remove(index) {
      if(this.items.length > 1) {
        this.items.splice(index,1)
      }
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
  .list_checkboxes
    margin-top: 4rem
    min-height: 3rem
    list-style-type: none
    word-wrap: break-word
    counter-reset: item
    .ghostClass
      opacity: .2
      background: red
</style>
