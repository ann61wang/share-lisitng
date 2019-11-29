<template lang="html">
  <div class="body_min_width">
    <common-header></common-header>
    <div class="container-fluid wrapper">
      <edit-title></edit-title>
      <edit-list></edit-list>
    </div>
    <div class="margin"></div>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import EditTitle from '~/components/edit/Title'
import EditList from '~/components/edit/List'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Edit',
  components: {
    CommonHeader,
    EditTitle,
    EditList
  },
  async asyncData ({ app, store, params, query, error }) {
    let url = ''
    if(process.env.VUE_ENV === 'client') {
      url = '/api/tasks/' + params.id
    }else {
      //当刷新时，store 的值为空，所以使用路由传参的方式来获取 vuex 中 session 的值
      url = '/api/tasks/' + params.id
    }
    return app.$axios.get(url)
    .then((res) => {
      let data = res.data
      if(data.name === 'CastError') {
        error({ statusCode: 404, message: '页面没有找到' })
      }else if(data.message == '请重新登陆'){
        return {
          message: '请重新登陆'
        }
      }else {
        return {
          author: data.author,
          category: data.category,
          title: data.title,
          desc: data.desc,
          imgSrc: data.imgSrc,
          imgAlt: data.imgAlt,
          isNumMaker: data.isNumMaker,
          listMessage: data.listMessage
        }
      }
    })
    .catch((e) => {
      error({ statusCode: 404, message: '页面没有找到' })
    })
  },
  methods: {
    ...mapMutations({
      syncList: 'sessionStorage/syncList',
      syncListObj: 'sessionStorage/syncListObj',
      insertImg: 'sessionStorage/insertImg',
      syncValue: 'sessionStorage/syncValue',
      judgeIsNumMaker: 'sessionStorage/judgeIsNumMaker',
      syncLastCategory: 'sessionStorage/syncLastCategory',
      syncCategory: 'sessionStorage/syncCategory'
    })
  },
  computed: {
    listTitle() {
      return Object.assign({}, {
        title: this.title,
        desc: this.desc
      })
    },
    imageObj() {
      return Object.assign({}, {
        imgSrc: this.imgSrc,
        imgAlt: this.imgAlt
      })
    },
    ...mapState({
      listNum: state => state.sessionStorage.listNum,
      listCache: state => state.sessionStorage.listMessage
    })
  },
  created() {
    this.insertImg(this.imageObj)
    this.syncListObj(Object.assign({},this.listMessage))
    this.syncValue(this.listTitle)
    this.judgeIsNumMaker(this.isNumMaker)
    this.syncLastCategory(this.category)
    this.syncCategory(this.category)
    if(this.message == '请重新登陆') {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .body_min_width
    min-width: $minWidth
    .wrapper
      max-width: 66rem
    .margin
      height: 60rem
</style>
