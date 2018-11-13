<template>
  <el-container class="login-container">
    <el-main class="login-main">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <h2 class="title">Ai派管理</h2>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" name="mobile" type="text" auto-complete="on" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input :type="pwdType" v-model="loginForm.password" name="password" auto-complete="on" placeholder="请输入密码" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item prop="code">
          <el-input class="codeInput" v-model="loginForm.code" type="text" name="code" auto-complete="on" placeholder="填写验证码" @keyup.enter.native.prevent="handleLogin" />
          <div class="codeImgWrap">
            <img :src="imgUrl" class="codeImg" alt="" @click="getCode">
          </div>
        </el-form-item>
        <!-- <el-checkbox v-model="checked">记住密码</el-checkbox>
          <span class="forgetPassword" @click="forgetPass">忘记密码？</span> -->
        <el-form-item>
          <el-button :loading="loading" type="primary" round style="width:100%;" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { login } from "@/api/login";
import * as cookieHandle from "@/utils/auth";
const API = process.env.BASE_API;

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      imgUrl: API + "/seller/user/code-login",
      loginForm: {
        mobile: "",
        password: ""
      },
      loginRules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    getCode() {
      this.imgUrl =
        API + "/seller/user/code-login" + "?" + "v=" + new Date().getTime();
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          let data = Object.assign({}, this.loginForm);
          // if (this.loginForm.password === _password) {
          //   data.password = localStorage.getItem(PASSWORD);
          //   if (this.checked) {
          //     data.type = 1;
          //   }
          // }
          login(data)
            .then(res => {
              this.$message.success(res.message);
              this.loading = false;
              if (res.data.token) {
                cookieHandle.setToken(res.data.token);
                this.$store.commit("SET_TOKEN", res.data.token);
              }
              // if (this.checked) {
              //   localStorage.setItem(PASSWORD, res.data.password);
              //   localStorage.setItem(MOBILE, this.loginForm.mobile);
              // } else {
              //   localStorage.removeItem(PASSWORD);
              //   localStorage.removeItem(MOBILE);
              // }
              this.$router.replace("/");
            })
            .catch(err => {
              this.loading = false;
              this.loginForm.code = "";
              this.getCode();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">

.el-form-item__content .codeImg {
  line-height: 0 !important;
}

.codeInput {
  width: 50%;
  box-sizing: border-box;
}
</style>
<style rel="stylesheet/scss" lang="scss">
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;
$color_888: #888;
.login-container {
  background-color: $bg;
  .login-main {
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    .login-form {
      margin: 0 auto;
      width: 400px;
      height: 400px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.96);
      padding: 0 5px 0 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 22px;
      line-height: 56px;
      font-weight: bold;
      color: #777;
      font-weight: normal;
      text-align: center;
    }
    .codeImgWrap {
      display: inline-block;
      vertical-align: top;
      width: 47%;
      text-align: center;
      img {
        width: 100%;
        height:40px;
        cursor: pointer;
      }
    }
    .forgetPassword {
      color: $color_888;
      transition: all 0.3s;
      font-size: 12px;
      cursor: pointer;
    }
    .forgetPassword:hover {
      color: #f00;
    }
    .show-pwd {
      position: absolute;
      right: 20px;
      top: 0px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
