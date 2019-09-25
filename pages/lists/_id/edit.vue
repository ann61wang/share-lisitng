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
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Edit',
  components: {
    CommonHeader,
    EditTitle,
    EditList
  },
  async asyncData ({ store, params, query, error }) {
    let url = ''
    if(process.env.VUE_ENV === 'client') {
      url = 'http://localhost:3000/users/' + store.state.localStorage.session + '/tasks/' + params.id
    }else {
      //当刷新时，store 的值为空，所以使用路由传参的方式来获取 vuex 中 session 的值
      url = 'http://localhost:3000/users/' + query.user +'/tasks/' + params.id
    }
    return axios.get(url)
    .then((res) => {
      let data = res.data
      if(data.name === 'CastError') {
        error({ statusCode: 404, message: '页面没有找到' })
      }else {
        return {
          maker: data.maker,
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
      judgeIsNumMaker: 'sessionStorage/judgeIsNumMaker'
    })
  },
  computed: {
    listTitle() {
      return {
        title: this.title,
        desc: this.desc
      }
    },
    ...mapState({
      listNum: state => state.sessionStorage.listNum,
      listCache: state => state.sessionStorage.listMessage
    })
  },
  mounted() {
    this.syncListObj(Object.assign({},this.listMessage))
    this.syncValue(this.listTitle)
    this.judgeIsNumMaker(this.isNumMaker)
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
