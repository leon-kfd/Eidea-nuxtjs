<template>
  <div id="Register">
    <div class="register-box">
      <p class="logo-img">
        <nuxt-link to="/">
          <img src="~assets/img/logo.png"
               width="200px">
        </nuxt-link>
      </p>
      <h2 class="welcome-text">Welcome!</h2>
      <div class="register-form">
        <div class="input-register-box">
          <label class="input-text">用户名</label>
          <input v-model="username"
                 class="input-style"
                 type="text"
                 name="username"
                 placeholder="Username"
                 required
                 minlength="2"
                 maxlength="10"
                 @blur="checkUsername">
          <span class="input-line"></span>
          <label v-show="usernameError"
                 class="error">用户名长度需在2~10之间</label>
          <div class="clear"></div>
        </div>
        <div class="input-register-box">
          <label class="input-text">邮箱</label>
          <input v-model="email"
                 class="input-style"
                 type="email"
                 name="email"
                 placeholder="E-mail"
                 required
                 @blur="checkEmail">
          <span class="input-line"></span>
          <label v-show="emailError"
                 class="error">邮箱格式错误</label>
          <div class="clear"></div>
        </div>
        <div class="input-register-box">
          <label class="input-text">密码</label>
          <input id="password"
                 v-model="password"
                 class="input-style"
                 type="password"
                 name="password"
                 placeholder="Password"
                 @blur="checkPassword">
          <span class="input-line"></span>
          <label v-show="passwordError"
                 class="error">密码长度需在2~10之间</label>
          <div class="clear"></div>
        </div>
        <div class="input-register-box">
          <label class="input-text">确认密码</label>
          <input v-model="confirmPassword"
                 class="input-style"
                 type="password"
                 name="confirm_password"
                 placeholder="Comfirm"
                 @blur="checkConfirmPassword">
          <span class="input-line"></span>
          <label v-show="confirmPasswordError"
                 class="error">2次输入的密码不同</label>
          <div class="clear"></div>
        </div>
        <div class="input-register-box check-row">
          <input id="agree"
                 v-model="checked"
                 class="check-btn"
                 type="checkbox"
                 name="agree"
                 :checked="checked"
                 @change="checkConfirm">
          <label class="checkbox1"
                 for="agree"></label>
          <label class="check-text">同意并接受 <a href="javascript:void(0)">《服务条款》</a> 等</label>
          <p v-show="checkedError"
             class="error">请同意服务条款</p>
          <div class="clear"></div>
        </div>
        <button class="btn1"
                type="submit"
                @click="toRegister">立即注册</button>
        <div class="tologin">
          <nuxt-link to="login">已有账号,现在登录.</nuxt-link>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import { post } from '~/plugins/axios'
export default {
  name: 'Register',
  layout: 'common',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      checked: true,
      usernameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      checkedError: false
    }
  },
  computed: {
    rulesFlag () {
      return this.usernameError || this.emailError || this.passwordError || this.confirmPasswordError || this.checkedError
    }
  },
  methods: {
    checkUsername () {
      if (this.username.length >= 2 && this.username.length <= 10) {
        this.usernameError = false
      } else {
        this.usernameError = true
      }
    },
    checkEmail () {
      if (/^.{1,}@.{1,}\..{1,}$/.test(this.email)) {
        this.emailError = false
      } else {
        this.emailError = true
      }
    },
    checkPassword () {
      if (this.password.length >= 2 && this.password.length <= 10) {
        this.passwordError = false
      } else {
        this.passwordError = true
      }
    },
    checkConfirmPassword () {
      if (this.confirmPassword === this.password && this.confirmPassword.length >= 2 && this.confirmPassword.length <= 10) {
        this.confirmPasswordError = false
      } else {
        this.confirmPasswordError = true
      }
    },
    checkConfirm () {
      if (this.checked) {
        this.checkedError = false
      } else {
        this.checkedError = true
      }
    },
    checkForm () {
      this.checkUsername()
      this.checkEmail()
      this.checkPassword()
      this.checkConfirmPassword()
      this.checkConfirm()
    },
    toRegister () {
      this.checkForm()
      if (!this.rulesFlag) {
        post('register', {
          username: this.username,
          email: this.email,
          password: this.password
        }).then(data => {
          alert('注册成功')
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
#Register {
  margin-top: 80px;
}
.register-box {
  width: 450px;
  background: #fff;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 50px;
  margin: 10px auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px #333;
}
input {
  outline: none;
}
p.logo-img {
  margin-bottom: 25px;
}
p.logo-img img {
  width: 200px;
  height: auto;
  margin-left: 10px;
}
h2.welcome-text {
  margin-bottom: 25px;
}
.input-register-box {
  display: block;
  width: 400px;
  margin: 10px auto 15px;
  text-align: left;
}
.input-text {
  width: 150px;
  text-align: right;
  padding-right: 10px;
  float: left;
  height: 30px;
  border-right: 1px solid #c8c8c8;
  line-height: 30px;
  margin-right: 10px;
}
.input-style {
  float: left;
  height: 30px;
  line-height: 30px;
  border-radius: 0;
  background: transparent;
  border: none;
  width: 195px;
  padding-left: 5px;
  font-size: 16px;
  border-bottom: 1px solid #999;
}
.btn1 {
  border: 2px #222 solid;
  font-size: 16px;
  color: #222;
  width: 120px;
  padding: 5px 10px;
}
.btn1:hover {
  color: #f5f5f5;
  background: rgb(220, 50, 50);
  transition: 0.4s;
  cursor: pointer;
}
.check-btn {
  display: none;
}
.check-btn + .checkbox1 {
  margin-left: 120px;
  cursor: pointer;
  font-size: 14px;
  padding: 1px;
  background-color: #fff;
  border: 1px solid #666;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}
.check-btn:checked + .checkbox1:after {
  content: "\2714";
  position: absolute;
  font-size: 13px;
  left: 2px;
  top: -2px;
}
.check-text {
  font-size: 14px;
  color: #444;
}
.check-text > a {
  color: rgb(50, 150, 150);
}
.input-line {
  position: relative;
  width: 195px;
  float: right;
  margin-right: 45px;
}
.input-line:after {
  display: none\9;
  position: absolute;
  content: "";
  top: -1px;
  left: 0;
  bottom: 0;
  right: 0;
  width: 0;
  border-top: 2px solid rgb(50, 50, 220);
}
.input-style:focus + .input-line:after {
  width: 100%;
  transition: 1s;
}
.tologin {
  margin-top: 10px;
}
.tologin > a {
  color: rgb(120, 50, 50);
  font-size: 14px;
}
label.error {
  width: 200px;
  color: #ee5555;
  margin-right: 40px;
  float: right;
  font-size: 12px;
  line-height: 24px;
}
p.error {
  text-align: center;
  font-size: 12px;
  line-height: 24px;
  color: #ee5555;
}
.check-row {
  user-select: none;
}
</style>
