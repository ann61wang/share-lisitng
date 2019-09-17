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
    </el-form>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '~/components/common/Header'
import CommonFooter from '~/components/common/Footer'
import axios from 'axios'

let Base64 = require("js-base64").Base64
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
          axios.get('http://localhost:3000/users/' + this.userInfo.name)
            .then(this.handleGetInfo).catch(reason => console.log(reason))
        }else {
          alert('登陆失败')
          return false
        }
      })
    },
    handleGetInfo(res) {
      let data = res.data
      if(data != null) {
        if(data.pass == this.userInfo.pass) {
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
    }
  },
  computed: {
    userInfo() {
      return {
        name: Base64.encode(this.ruleForm.name),
        pass: sha256(this.ruleForm.pass)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login_form
    margin: 18.5rem auto
    max-width: 50rem
</style>
