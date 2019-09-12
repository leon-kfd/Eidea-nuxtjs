<template>
  <div class="home-header">
    <div class="container">
      <div class="clear">
        <div class="logo-box fl">
          <img src="@/assets/img/logo.png"
               class="logo-img"
               height="60px"
               @click="$router.push('/')">
        </div>
        <div class="nav-box fl">
          <ul class="classify-nav-list">
            <li class="classify-nav-listitem">
              <span class="title">男士</span>
              <ul class="classify-second-list">
                <p class="nav-title-after">MEN</p>
                <li class="classify-second-listitem">
                  <nuxt-link :to="{path: '/query', query: {sex:1, classify:1}}">男士衣服</nuxt-link>
                </li>
                <li class="classify-second-listitem">
                  <nuxt-link :to="{path: '/query', query: {sex:1, classify:2}}">男士裤子</nuxt-link>
                </li>
                <li class="classify-second-listitem">
                  <nuxt-link :to="{path: '/query', query: {sex:1, classify:3}}">男士鞋子</nuxt-link>
                </li>
              </ul>
            </li>
            <li class="classify-nav-listitem">
              <span class="title">女士</span>
              <ul class="classify-second-list">
                <p class="nav-title-after">LADY</p>
                <li class="classify-second-listitem">
                  <nuxt-link :to="{path: '/query', query: {sex:2, classify:1}}">女士衣服</nuxt-link>
                </li>
                <li class="classify-second-listitem">
                  <nuxt-link :to="{path: '/query', query: {sex:2, classify:2}}">女士裤子</nuxt-link>
                </li>
                <li class="classify-second-listitem">
                  <nuxt-link :to="{path: '/query', query: {sex:2, classify:3}}">女士鞋子</nuxt-link>
                </li>
              </ul>
            </li>
            <li class="classify-nav-listitem">
              <a href="javascript:"
                 class="link01"><span class="title">限时活动</span></a>
            </li>
          </ul>
        </div>
        <div class="search-box fr">
          <div class="input-box fl">
            <input v-model.trim="searchWord"
                   type="text"
                   class="input-style1"
                   placeholder="全站搜索商品"
                   @keyup.enter="searchGoods">
            <span class="search-btn"
                  @click="searchGoods"><i class="fa fa-search fa-fw"></i></span>
          </div>
          <div class="user-box fl">
            <span><i class="fa fa-user-o fa-fw"></i>
              <nuxt-link v-if="!username"
                         to="login">登录</nuxt-link>
              <nuxt-link v-if="username"
                         to="personal/settlement"
                         class="username">{{ username }}</nuxt-link>
              <span v-if="username"
                    class="logout"
                    @click="toLogout">注销</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      searchWord: ''
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  },
  async created () {
    const { data: username } = await this.$get('checkLogin')
    this.$store.commit('updateUsername', username)
  },
  mounted () {
    this.searchWord = this.$route.query.word || ''
  },
  methods: {
    searchGoods () {
      location.href = `/query?word=${this.searchWord}`
    },
    toLogout () {
      this.$get('logout').then(data => {
        this.$store.commit('updateUsername', '')
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.home-header {
  background: #fff;
  min-width: 1080px;
  height: 60px;
  box-shadow: 0 0 3px #999;
  .logo-img {
    cursor: pointer;
    height: 60px;
    width: auto;
  }
}
.classify-nav-list {
  list-style: none;
  padding-left: 20px;
  .classify-nav-listitem {
    display: inline-block;
    width: 120px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: relative;
    .classify-second-list {
      position: absolute;
      background: #fff;
      top: 0;
      left: 0;
      width: 120px;
      height: 60px;
      overflow: hidden;
      visibility: hidden;
      z-index: 99;
      box-shadow: 0 2px 6px #888, 0 -5px 0 #c3a56e inset;
      padding-bottom: 15px;
    }
    &:hover {
      .classify-second-list {
        height: 215px;
        visibility: visible;
        transition: 0.6s all;
        .classify-second-listitem {
          width: 120px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          &:hover {
            color: #c3a56e;
          }
        }
      }
    }
    .title {
      font-weight: bold;
    }
  }
}

p.nav-title-after {
  color: #c3a56e;
  font-weight: bold;
  font-size: 1.2em;
  cursor: default;
}
a.link01:hover {
  color: #c3a56e;
}
.input-box {
  border-bottom: 2px solid #262626;
  padding: 5px 0;
  height: 36px;
  box-sizing: border-box;
  margin: 14px 20px;
  input.input-style1 {
    background: transparent;
    border: none;
    padding: 2px 5px;
    width: 120px;
    outline: none;
  }
  i {
    font-size: 1.2em;
  }
}
.user-box {
  height: 60px;
  line-height: 60px;
  font-weight: bold;
  .username {
    padding-right: 8px;
    text-transform: capitalize;
  }
  .logout {
    border-left: 2px solid #262626;
    padding-left: 10px;
    cursor: pointer;
  }
  i {
    font-weight: bold;
    font-size: 1.1em;
  }
}
.nav-box {
  p.nav-title {
    height: 62px;
    line-height: 62px;
    margin-left: 70px;
    font-size: 1.6em;
    font-weight: bold;
    position: relative;
    color: #262626;
    &::before {
      position: absolute;
      content: "";
      width: 40px;
      top: 50%;
      left: -50px;
      border-top: 2px solid #262626;
    }
  }
}
.search-btn {
  cursor: pointer;
}
</style>
