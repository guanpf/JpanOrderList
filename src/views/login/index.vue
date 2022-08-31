<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginName"
          v-model.trim="loginForm.loginName"
          placeholder="请输入账号"
          name="loginName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="loginPwd" />
        </span>
        <el-input
          :key="loginPwdType"
          ref="loginPwd"
          v-model="loginForm.loginPwd"
          :type="loginPwdType"
          placeholder="请输入密码"
          name="loginPwd"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="loginPwdType === 'loginPwd' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="loginPwd" />
        </span>
        <el-input
          ref="code"
          v-model.trim="loginForm.code"
          placeholder="请输入验证码"
          name="code"
          type="text"
          tabindex="3"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="getCode">
          <img :src="imgUrl" />
        </span>
      </el-form-item> -->
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >Login</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validloginName } from "@/utils/validate";
import { getCode } from "@/api/user";
export default {
  name: "Login",
  data() {
    const validateloginName = (rule, value, callback) => {
      if (!validloginName(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validateloginPwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The loginPwd can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      imgUrl: "",
      loginForm: {
        loginName: "test",
        loginPwd: "test",
        code: "",
        uuid: "",
      },
      loginRules: {
        loginName: [{ required: true, trigger: "blur", message: "请输入账号" }],
        loginPwd: [{ required: true, trigger: "blur", message: "请输入密码" }],
        // code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      loading: false,
      loginPwdType: "loginPwd",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    // this.getCode();
  },
  methods: {
    async getCode() {
      let res = await getCode();
      this.imgUrl = "data:image/png;base64," + res.data.imgCode;
      this.loginForm.uuid = res.data.uuid;
    },
    showPwd() {
      if (this.loginPwdType === "loginPwd") {
        this.loginPwdType = "";
      } else {
        this.loginPwdType = "loginPwd";
      }
      this.$nextTick(() => {
        this.$refs.loginPwd.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
