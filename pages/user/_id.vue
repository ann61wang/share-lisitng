<template lang="html">
  <div class="body_min_width">
    <common-header></common-header>
    <div class="container-fluid margin_medium">
      <div class="container_max_width">
        <h2>我的所有清单</h2>
        <!-- 管理员可以创建和删除分类，还需要处理 DOM 元素的增减 -->
        <el-row v-show="isAdmin" :gutter="14" class="min_width">
          <el-col :span="4">
            <el-input v-model="inputEnglish" placeholder="创建或删除分类(英文)"></el-input>
            <image-upload></image-upload>
          </el-col>
          <el-col :span="4">
            <el-input v-model="inputChinese" placeholder="创建或删除分类(中文)"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="addCategory">创建</el-button>
            <el-button>更新</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="removeCategory">删除</el-button>
          </el-col>
        </el-row>
        <div v-show="listArr.length === 0" style="height: 30rem;"></div>
        <div class="row with_gutter">
          <div v-for="(item,index) of listArr" :key="item._id"
            class="column col-xs-12 col-sm-6 col-md-4 col-lg-4"
          >
            <nuxt-link :to="'/lists/' + item._id" class="list_shadow">
              <img :src="item.imgSrc" :alt="item.imgAlt" class="column_img">
              <div class="list_content">
                <h4>{{item.title}}</h4>
                <div class="iconfont icon_list">&#xe635;</div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import CommonFooter from '~/components/common/Footer'
import ImageUpload from '~/components/user/ImageUpload'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'User',
  components: {
    CommonHeader,
    CommonFooter,
    ImageUpload
  },
  data() {
    return {
      inputEnglish: '',
      inputChinese: ''
    }
  },
  async asyncData ({ app, params, query, error }) {
    let url = '/api/users/' + params.id

    return app.$axios.get(url)
    .then((res) => {
      if(res.data === null) {
        error({ statusCode: 404, message: '页面没有找到' })
      }else {
        return {
          taskArr: res.data.tasks
        }
      }
    })
    .catch((e) => {
      error({ statusCode: 404, message: '页面没有找到' })
    })
  },
  methods: {
    addCategory() {
      if(this.inputEnglish && this.inputChinese) {
        this.$axios.post('/api/categories/', this.categoryInfo)
          .then(this.handlePostInfo).catch(reason => console.log(reason))
      }
    },
    handlePostInfo(res) {
      let data = res.data
      if(data.errmsg == undefined) {
        this.open1()
      }else {
        this.open2()
      }
      this.inputEnglish = ''
      this.inputChinese = ''
    },
    open1() {
      this.$message({
        showClose: true,
        message: this.inputChinese + '分类被成功创建',
        type: 'success'
      })
    },
    open2() {
      this.$message({
        showClose: true,
        message: '该分类已存在，请创建一个不同的分类！',
        type: 'warning'
      })
    },
    removeCategory() {
      if(this.inputEnglish) {
        this.$axios.delete('/api/categories/' + this.inputEnglish)
          .then(this.handleDeleteInfo).catch(reason => console.log(reason))
      }
    },
    handleDeleteInfo(res) {
      let data = res.data
      if(data.message == 'Category successfully deleted') {
        this.open3()
      }else {
        this.$message.error('删除分类失败')
      }
      this.inputEnglish = ''
      this.inputChinese = ''
    },
    open3() {
      this.$message({
        showClose: true,
        message: this.inputChinese + '分类被成功删除',
        type: 'success'
      })
    }
  },
  computed: {
    listArr() {
      if(this.taskArr) {
        return this.taskArr
      }else {
        return []
      }
    },
    isAdmin() {
      return this.session === 'admin'
    },
    categoryInfo() {
      return {
        _id: this.inputEnglish,
        name: this.inputChinese,
        imageUrl: this.imgSrc,
        imageAlt: this.imgAlt
      }
    },
    ...mapState({
      session: state => state.localStorage.session,
      category: state => state.localStorage.category,
      imgSrc: state => state.user.image.imgSrc,
      imgAlt: state => state.user.image.imgAlt
    })
  },
  mounted () {
    if(this.listArr.message == '请重新登陆') {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .body_min_width
    min-width: $minWidth
    @media (min-width: 89.9rem)
      .margin_medium
        margin: 10rem 8rem 0 8rem
    @media (max-width: 89.9rem)
      .margin_medium
        margin: 10rem 3.2rem 0 3.2rem
    .container_max_width
      max-width: $maxWidth
      margin: 0 auto
      @media (max-width: 69rem)
       .min_width
         display: none
      .with_gutter
        margin-top: 4rem
        .column
          height: 41.8rem
          border-radius: $borderRadius
          margin: 1rem 0
          .list_shadow
            display: block
            box-shadow: 0 .2rem .6rem rgba(112,112,112,0.2)
            box-sizing: border-box
            text-decoration: none
            color: $darkTextColor
          .column_img
            display: block
            width: 100%
            height: 18rem
            object-fit: cover
          .list_content
            padding: 2rem
            min-height: 25rem
            h4
              font-weight: 500
            .icon_list
              font-size: 10rem
              width: 70%
              color: $grayTextColor
</style>
