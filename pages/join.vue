<template lang="html">
  <div>
    <common-header></common-header>
    <el-form status-icon
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-fuleForm join_form"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model.trim="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model.trim="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model.trim="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
      <div>已有账号？<nuxt-link to="/login">去登陆</nuxt-link></div>
    </el-form>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import CommonFooter from '~/components/common/Footer'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
let Base64 = require("js-base64").Base64
let sha256 = require("js-sha256").sha256

export default {
  name: 'Join',
  components: {
    CommonHeader,
    CommonFooter
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if(value != this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致！'))
      }else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 8, message: '用户名过长', trigger: 'change' }
        ],
        pass: [
          {required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '密码长度必须是6-8位', trigger: 'blur' }
        ],
        checkPass: [
          {required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          axios.post('http://localhost:3000/users/', this.userInfo)
            .then(this.handlePostInfo).catch(reason => console.log(reason))
        }else {
          alert('注册失败')
          return false
        }
      })
    },
    handlePostInfo(res) {
      let data = res.data
      if(data.errmsg == undefined) {
        this.$router.push('/login')
      }else {
        this.open()
      }
    },
    open() {
      this.$message({
        showClose: true,
        message: '该用户名已被注册，请换一个用户名！',
        type: 'warning'
      })
    }
  },
  computed: {
    userInfo() {
      return {
        _id: Base64.encode(this.ruleForm.name),
        name: Base64.encode(this.ruleForm.name),
        pass: sha256(this.ruleForm.pass)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .join_form
    margin: 0 auto
    margin-top: 10rem
    margin-bottom: 4rem
    max-width: 50rem
</style>
