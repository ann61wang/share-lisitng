<template lang="html">
  <div>
    <div class="editable_toolbar">
      <div class="editable_toolbar_controls">
        <button class="btn btn-default icon_btn"
          v-for="(btn, index) in btns"
          :key="btn.title"
          :title="btn.title"
          @click.prevent="handleBtnClick(index)"
        >
          <span class="iconfont" v-html="btn.icon"></span>
        </button>
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
          :id="item.id"
        >
        </component>
      </transition-group>
    </draggable>


    <el-button class="save_btn" @click="submitDate">
      保存
    </el-button>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        清单类别<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="旅游">旅游</el-dropdown-item>
        <el-dropdown-item command="教育">教育</el-dropdown-item>
        <el-dropdown-item command="电影">电影</el-dropdown-item>
        <el-dropdown-item command="娱乐">娱乐</el-dropdown-item>
        <el-dropdown-item command="工作">工作</el-dropdown-item>
        <el-dropdown-item command="梦想">梦想</el-dropdown-item>
        <el-dropdown-item command="体育">体育</el-dropdown-item>
        <el-dropdown-item command="美食">美食</el-dropdown-item>
        <el-dropdown-item command="其他" divided>其他(默认)</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import AddList from '~/components/write/components/AddList'
import draggable from 'vuedraggable'
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
let Base64 = require("js-base64").Base64

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
      items: [{component: 'add-list', id: 0}],
      btns: [{
        title: '切换标记符', icon: '&#xe62e;'
      },{
        title: '显示隐藏', icon: '&#xe696;'
      },{
        title: '字体样式', icon: '&#xe662;'
      },{
        title: '字体颜色', icon: '&#xe667;'
      },{
        title: '全部删除', icon: '&#xe612;'
      },{
        title: '添加图名', icon: '&#xe6ed;'
      }]
    }
  },
  methods: {
    handleCommand(command) {
      this.syncCategory(command)
    },
    submitDate() {
      if(!this.session) {
        this.$router.push('/login')
        return
      }else {
        if(!this.title) {
          this.$message.error('标题不能为空')
          return
        }else if(!this.$refs.list[0].$el.children[3].innerText){
          this.$message.error('第一条的内容不能为空')
          return
        }else {
          this.listData.imgSrc = this.imgSrc
          this.listData.imgAlt = this.imgAlt
          this.listData.title = this.title
          this.listData.desc = this.desc
          this.listData.maker = this.session
          this.listData.category = this.category
          this.listData.listMessage = this.listMessage
          this.listData.isNumMaker = this.isNumMaker
          this.judgeIsNumMaker(this.isNumMaker)
          axios.post('http://localhost:3000/categories/' + this.category, this.listData)
            .catch(reason => console.log(reason))
          axios.post('http://localhost:3000/users/' + this.session + '/tasks/', this.listData)
            .then(this.handlePostInfo).catch(reason => console.log(reason))
        }
      }
    },
    handlePostInfo(res) {
      let data = res.data
      let id = data._id
      let user = data.maker
      this.clearCacheAll()
      this.clearComfirm()
      this.$emit('clearTitle')
      this.$router.push({name: 'lists-id', params: { id }, query: { user }})
    },
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
      try {
        localStorage.removeItem(this._id)
      } catch (e) {}
    },
    handleBtnClick(index) {
      switch (index) {
        case 0:
          this.handleNumClick()
          break;
        case 1:
          this.handleBoxClear()
          break;
        case 4:
          this.handleClearAll()
          break;
        case 5:
          if(this.imgSrc) {
            this.isPicName = true
          }else {
            alert('请先添加图片，再添加图片名称')
          }
          break;
        default:
          return
      }
    },
    handleNumClick() {
      this.$refs.list.forEach(function(item) {
        if(item.subTitle) {
          item.liClassName.break = true
          item.liClassName.list_maker = false
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
      this.count = 0
      this.syncList(this.copyItems)
      this.isClearAll = false
      setTimeout(() => { if(this.$refs.list[0].content) this.$refs.list[0].content = '' }, 450)
      if(this.isNumMaker) this.handleNumClick()
      try {
        Object.keys(localStorage).forEach((item) => {
          if(!isNaN(Number(item))) {
            localStorage.removeItem(item)
          }
        })
      } catch (e) {}
    },
    handleNameSubmit() {
      this.isPicName = false
      this.changeImgAlt(this.inputValue)
      this.inputValue = ''
    },
    ...mapMutations({
      changeImgAlt: 'localStorage/changeImgAlt',
      syncList: 'localStorage/syncList',
      syncCategory: 'localStorage/syncCategory',
      judgeIsNumMaker: 'localStorage/judgeIsNumMaker',
      clearCacheAll: 'localStorage/clearCacheAll'
    })
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
    },
    //由于数组类型也属于object，将引用赋值给新的变量，修改变量会直接修改引用，为了保证不在 mutations之外修改 state 值，所以创建了一个副本
    copyItems() {
      return this.items.slice()
    },
    ...mapState({
      listNum: state => state.localStorage.listNum,
      imgSrc: state => state.localStorage.image.imgSrc,
      imgAlt: state => state.localStorage.image.imgAlt,
      title: state => state.localStorage.title.titleCache,
      desc: state => state.localStorage.title.descCache,
      listMessage: state => state.localStorage.listMessage,
      maker: state => state.localStorage.maker,
      category: state => state.localStorage.category,
      isNumMakerCache: state => state.localStorage.isNumMaker,
      session: state => state.localStorage.session
    }),
    listData() {
      return {
        imgSrc: '',
        imgAlt: '',
        title: '',
        desc: '',
        maker: '',
        category: '其他',
        isNumMaker: false,
        listMessage: {}
      }
    }
  },
  watch: {
    isPicName() {
     if(this.isPicName) this.$nextTick(() => $(".input_name").focus())
   },
   items() {
     this.syncList(this.copyItems)
   },
   // isNumMaker() {
   //   this.judgeIsNumMaker(this.isNumMaker)
   // }
  },
  mounted() {
    if(this.listNum.length > 1) {
      this.items = this.listNum
      this.count = this.listNum.length - 1
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
  .save_btn
    margin-top: 4rem
    background: $bgBtnColor
    color: $whiteTextColor
    font-weight: $fontWeight
</style>
