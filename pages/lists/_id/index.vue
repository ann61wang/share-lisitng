<template lang="html">
  <div class="body_min_width">
    <common-header></common-header>
    <div class="container-fluid list_page">
      <list-follow :likeInfo="likeInfo"></list-follow>
      <list-main :listData="listData"></list-main>
      <list-relate :category="category"></list-relate>
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
  async asyncData ({ app, params, error }) {
    return app.$axios.get('/api/tasks/' + params.id)
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
          pv: data.pv,
          likes: data.likes,
          isClickLike: data.isClickLike,
          copy: data.copy,
          isNumMaker: data.isNumMaker,
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
        pv: this.pv,
        copy: this.copy,
        imgSrc: this.imgSrc,
        imgAlt: this.imgAlt,
        isNumMaker: this.isNumMaker,
        author: this.author,
        category: this.category,
        listMessage: this.listMessage
      }
    },
    likeInfo() {
      return {
        author: this.author,
        likes: this.likes,
        isClickLike: this.isClickLike
      }
    },
    ...mapState({
      session: state => state.localStorage.session
    })
  },
  activated () {
    if(this.message == '请重新登陆') {
      this.$router.push('/login')
    }
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
