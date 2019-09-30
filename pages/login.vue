<template lang="html">
  <div>
    <common-header></common-header>
    <el-form status-icon
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-fuleForm login_form"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model.trim="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model.trim="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
      </el-form-item>
      <div>没有账号？<nuxt-link to="/join">去注册</nuxt-link></div>
    </el-form>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import CommonFooter from '~/components/common/Footer'
import { mapState,mapMutations } from 'vuex'
let sha256 = require("js-sha256").sha256

export default {
  name: 'Login',
  components: {
    CommonHeader,
    CommonFooter
  },
  data() {
    return {
      nameExist: true,
      passRight: true,
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pass: [
          {required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.$axios.get('/api/users/' + this.userInfo._id)
            .then(this.handleGetInfo).catch(reason => console.log(reason))
        }else {
          alert('请正确填写')
          return false
        }
      })
    },
    handleGetInfo(res) {
      let data = res.data
      if(data != null) {
        if(data.pass == this.userInfo.pass) {
          this.haveSession(data.name)
          this.$router.push('/')
        }else {
          this.open2()
        }
      }else {
        this.open1()
      }
    },
    open1() {
      this.$message({
        showClose: true,
        message: '用户名不存在！',
        type: 'error'
      });
    },
    open2() {
      this.$message({
        showClose: true,
        message: '密码不正确！',
        type: 'error'
      });
    },
    ...mapMutations({
      haveSession: 'localStorage/haveSession'
    })
  },
  computed: {
    userInfo() {
      return {
        _id: this.ruleForm.name,
        name: this.ruleForm.name,
        pass: sha256(this.ruleForm.pass)
      }
    },
    ...mapState({
      session: state => state.localStorage.session
    })
  },
  mounted() {
    // console.log(this.$route.query.userId)
  }
}
</script>

<style lang="stylus" scoped>
  .login_form
    margin: 0 auto
    margin-top: 14rem
    margin-bottom: 11rem
    max-width: 50rem
</style>
