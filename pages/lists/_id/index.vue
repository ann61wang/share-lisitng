<template lang="html">
  <div class="body_min_width">
    <common-header></common-header>
    <div class="container-fluid list_page">
      <list-follow></list-follow>
      <list-main :listData="listData"></list-main>
      <list-relate></list-relate>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import ListFollow from '~/components/lists/Follow'
import ListMain from '~/components/lists/Main'
import ListRelate from '~/components/lists/Relate'
import CommonFooter from '~/components/common/Footer'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Lists',
  components: {
    CommonHeader,
    ListFollow,
    ListMain,
    ListRelate,
    CommonFooter
  },
  async asyncData ({ store, params, query, error }) {
    let url = ''
    if(process.env.VUE_ENV === 'client') {
      url = 'http://localhost:3000/tasks/' + params.id
    }else {
      //当刷新时，store 的值为空，所以使用路由传参的方式来获取 vuex 中 session 的值
      url = 'http://localhost:3000/tasks/' + params.id
    }
    return axios.get(url)
    .then((res) => {
      let data = res.data
      if(data.name === 'CastError') {
        error({ statusCode: 404, message: '页面没有找到' })
      }else {
        return {
          author: data.author,
          category: data.category,
          title: data.title,
          desc: data.desc,
          imgSrc: data.imgSrc,
          imgAlt: data.imgAlt,
          listMessage: data.listMessage
        }
      }
    })
    .catch((e) => {
      error({ statusCode: 404, message: '页面没有找到' })
    })
  },
  computed: {
    listData() {
      return {
        title: this.title,
        desc: this.desc,
        imgSrc: this.imgSrc,
        imgAlt: this.imgAlt,
        author: this.author,
        category: this.category,
        listMessage: this.listMessage
      }
    },
    ...mapState({
      session: state => state.localStorage.session
    })
  }
}
</script>

<style lang="stylus" scoped>
  .body_min_width
    min-width: 30rem
    @media (min-width: 53.2rem)
      .list_page
        margin: 5.8rem 6rem 0 6rem
    @media (max-width: 53.2rem)
      .list_page
        margin: 5.8rem 1.6rem 0 1.6rem
</style>
