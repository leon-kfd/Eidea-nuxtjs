<template>
  <div id="Personal">
    <div class="container">
      <div class="personal-box clear">
        <div class="left-nav fl">
          <ul class="personal-nav">
            <li :class="navActive==0?'active':''"
                @click="turn(0)"><span>我的订单</span></li>
            <li :class="navActive==1?'active':''"
                @click="turn(1)"><span>个人资料</span></li>
            <li :class="navActive==2?'active':''"
                @click="turn(2)"><span>我的收藏</span></li>
            <li :class="navActive==3?'active':''"><span>积分与优惠</span></li>
          </ul>
        </div>
        <div class="right-box fl">
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navActive: 0,
      routerMap: {
        0: '/personal/my-settlement',
        1: '/personal/personal-info',
        2: '/personal/my-collection'
      }
    }
  },
  watch: {
    '$route.path': {
      handler (val) {
        this.navActive = ~~Object.keys(this.routerMap).find(item => this.routerMap[item] == val)
      },
      immediate: true
    }
  },
  methods: {
    turn (val) {
      this.$router.push(this.routerMap[val])
    }
  }
}
</script>
<style lang='scss' scoped>
#Personal {
  padding-top: 30px;
}
.personal-box {
  width: 100%;
  background: #fff;
  box-shadow: 0 0 5px #aaa, 0 1px 15px #aaa;
  padding: 10px;
  min-height: 500px;
  padding-bottom: 30px;
}
.left-nav {
  box-sizing: border-box;
  width: 150px;
  padding: 20px 10px;
  ul.personal-nav {
    li {
      padding: 25px 0 6px;
      cursor: pointer;
      span {
        position: relative;
        padding: 0 3px 3px;
        &:after {
          position: absolute;
          content: "";
          left: 0;
          bottom: -6px;
          border-top: 3px solid #111;
          width: 0;
          transition: 0.6s all;
        }
      }
      &.active {
        span:after {
          width: 100%;
        }
      }
      &:hover {
        font-weight: bold;
        span:after {
          width: 100%;
          transition: 0.6s all;
        }
      }
    }
  }
}

.right-box {
  box-sizing: border-box;
  width: 850px;
  min-height: 500px;
  padding-top: 15px;
  padding-left: 25px;
  border-left: 2px solid #222;
}
</style>
