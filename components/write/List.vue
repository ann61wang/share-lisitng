<template lang="html">
  <div>
    <ul class="list_checkboxes sortable">
      <component :is="item.component"
        v-for="(item,index) in items"
        :key="item.id"
        @handle-add="add(index, 'add-list')"
        @handle-remove="remove(index)"
        :index="index"
      >
    </component></br>
    </ul>
  </div>
</template>

<script>
import AddList from '~/components/write/components/AddList'
export default {
  name: 'WriteList',
  components: {
    AddList
  },
  data() {
    return {
      count: 0,
      items: [{component: 'add-list', id: 0}]
    }
  },
  methods: {
    add(index,name) {
      this.count++
      this.items.splice(index+1, 0, { component: name, id: this.count })
      setTimeout(()=>$(".input_list")[index+1].focus(), 10)
    },
    remove(index) {
      if(this.items.length > 1) {
        this.items.splice(index,1)
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

</style>
