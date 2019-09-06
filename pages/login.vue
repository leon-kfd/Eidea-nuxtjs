<template>
  <div id="Login">
    <div class="container">
      <div class="login-box">
        <p class="logo-img">
          <nuxt-link to="/">
            <img src="~assets/img/logo.png"
                 width="200px">
          </nuxt-link>
        </p>
        <h2 class="welcome-text">Welcome!</h2>
        <div class="login-form">
          <div class="input-login-box">
            <span class="input-icon"><i class="fa fa-user-o fa-fw"></i></span>
            <input v-model="username"
                   type="text"
                   class="input-login"
                   name="username"
                   placeholder="Username">
          </div>
          <div class="input-login-box">
            <span class="input-icon"><i class="fa fa-key fa-fw"></i></span>
            <input v-model="password"
                   type="password"
                   class="input-login"
                   name="password"
                   placeholder="password"
                   @keyup.enter="toLogin">
          </div>
          <button class="btn1"
                  @click="toLogin">登录</button>
          <br>
          <nuxt-link to="register"
                     class="register-btn">注册</nuxt-link>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'common',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    toLogin () {
      if (this.username.length > 0 && this.password.length > 0) {
        this.$post('/login', {
          username: this.username,
          password: this.password
        }).then(data => {
          this.$store.commit('updateUsername', this.username)
          this.$router.push('/')
        }, data => {
          alert('账号密码错误')
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
#Login {
  margin-top: 80px;
}
.login-box {
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
.input-login-box {
  width: 300px;
  margin: 0 auto 25px;
  position: relative;
}
.input-icon {
  position: absolute;
  top: 6px;
  left: 0;
  height: 28px;
  line-height: 28px;
  width: 40px;
  text-align: center;
  border-right: 1px solid #ccc;
}
.input-login {
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 40px;
  padding: 6px 12px;
  padding-left: 48px;
  font-size: 15px;
  line-height: 1.6;
  color: #111111;
  background-color: transparent;
  border: 1px solid #999;
  border-radius: 4px;
  outline: none;
}
.input-login:focus {
  border: 1px solid #111;
}
.btn1 {
  box-sizing: border-box;
  width: 300px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  border-radius: 4px;
  background: #333;
  color: #fff;
  outline: none;
  border: 1px solid #333;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 4px;
}
.btn1:hover {
  background: #111;
  border: 1px solid #111;
  transition: all 0.5s;
}
.register-btn {
  display: inline-block;
  margin: 15px auto;
  color: #888 !important;
  font-size: 15px;
  letter-spacing: 4px;
}
.register-btn:hover {
  color: #111 !important;
  text-decoration: underline;
}
</style>
