<template>
  <div class="home-page">
    <div class="page-head">
      <div class="container">
        <div id="carousel"
             class="carousel-box">
          <div v-for="(item,index) in carouselList"
               :key="index"
               class="carousel-list"
               @mouseover="clearslide"
               @mouseout="setslide">
            <div class="carousel-img">
              <transition name="slide-fade-right">
                <img v-if="activeindex==index"
                     v-lazy="item.goodsimg">
              </transition>
            </div>
            <div class="carousel-text">
              <transition name="slide-fade-left">
                <div v-if="activeindex==index"
                     class="carousel-text-main">
                  <p class="goods-name">{{ item.goodsname }}</p>
                  <p class="goods-detail">{{ item.goodsdetail }} </p>
                  <p class="goods-price"><i class="fa fa-jpy fa-fw"></i>{{ item.goodsprice }}</p>
                  <button class="btn-buy"
                          @click="$router.push({path:'/detail', query:{id: item.goodsid}})">
                    立即购买 <i class="fa fa-long-arrow-right"
                       aria-hidden="true"></i>
                  </button>
                </div>
              </transition>
            </div>
          </div>
          <ul class="carousel-btn-list">
            <li v-for="(item,index) in carouselList"
                :key="index"
                :class="{'active':activeindex==index}"
                @click="tochocie(index)"></li>
          </ul>
          <div class="carousel-computed">
            <span class="now">{{ activeindex+1 }}</span>
            &nbsp;/&nbsp;
            <span class="total">{{ carouselList.length }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div id="selling"
           class="container">
        <div class="man-selling-box">
          <p class="selling-title fl">男士热销单品</p>
          <p class="selling-more fr">
            <nuxt-link :to="{path: '/query', query: {sex:1 }}">查看更多</nuxt-link>
          </p>
          <div class="clear"></div>
          <div class="selling-box-main clear">
            <div v-for="(item,index) in manSelling"
                 :key="index"
                 class="selling-box-list fl"
                 @click="$router.push({path:'/detail', query:{id: item.goodsid}})">
              <p class="list-tag">Top.0<span>{{ index+1 }}</span></p>
              <p class="goods-name">{{ item.goodsname }}</p>
              <p class="goods-img">
                <img v-lazy="item.goodsimg"
                     width="200"
                     height="250">
              </p>
              <p class="goods-price fl"><i class="fa fa-jpy"></i> {{ item.goodsprice }}</p>
              <p class="goods-detail fr">Detail <i class="fa fa-long-arrow-right"></i></p>
            </div>
          </div>
        </div>
        <div class="lady-selling-box">
          <p class="selling-title fl">女士热销单品</p>
          <p class="selling-more fr">
            <nuxt-link :to="{path: '/query', query: {sex:2 }}">查看更多</nuxt-link>
          </p>
          <div class="clear"></div>
          <div class="selling-box-main clear">
            <div v-for="(item,index) in ladySelling"
                 :key="index"
                 class="selling-box-list fl"
                 @click="$router.push({path:'/detail', query:{id: item.goodsid}})">
              <p class="list-tag">Top.0<span>{{ index+1 }}</span></p>
              <p class="goods-name">{{ item.goodsname }}</p>
              <p class="goods-img">
                <img v-lazy="item.goodsimg"
                     width="200"
                     height="250">
              </p>
              <p class="goods-price fl"><i class="fa fa-jpy"></i> {{ item.goodsprice }}</p>
              <p class="goods-detail fr">Detail <i class="fa fa-long-arrow-right"></i></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      timer: null,
      activeindex: 0
    }
  },
  async asyncData ({ app }) {
    const { data: carousel } = await app.$get('getCarouselList')
    const { data: selling } = await app.$get('getHomeGoods')
    const carouselList = carousel.map(item => {
      item.goodsimg = `${app.$baseURL}${item.goodsimg}`
      return item
    })
    const manSelling = selling.manItems.map(item => {
      item.goodsimg = `${app.$baseURL}goodsimg/${item.goodsimg}`
      return item
    })
    const ladySelling = selling.ladyItems.map(item => {
      item.goodsimg = `${app.$baseURL}goodsimg/${item.goodsimg}`
      return item
    })
    return {
      carouselList,
      manSelling,
      ladySelling
    }
  },
  mounted () {
    this.setslide()
  },
  destroyed () {
    this.timer = null
  },
  methods: {
    tochocie (cindex) {
      this.activeindex = cindex
    },
    setslide () {
      const _this = this
      this.timer = setInterval(() => {
        _this.autoslide()
      }, 4000)
    },
    autoslide () {
      if (this.activeindex === this.carouselList.length - 1) {
        this.activeindex = 0
      } else {
        this.activeindex++
      }
    },
    clearslide () {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-head {
  background: #ddeeff;
  .carousel-box {
    height: 400px;
    position: relative;
    .carousel-list {
      .carousel-img {
        position: absolute;
        top: 12px;
        left: 150px;
        img {
          width: 300px;
          height: 375px;
        }
      }
      .carousel-text {
        position: absolute;
        top: 50px;
        left: 470px;
        padding-top: 50px;
        text-align: center;
        width: 350px;
        .goods-name {
          font-size: 1.5em;
          font-weight: bold;
          color: #262626;
          margin-bottom: 15px;
          line-height: 32px;
          max-height: 96px;
          overflow: hidden;
        }
        .goods-detail {
          font-size: 1.2em;
          font-weight: bold;
          color: #666;
          margin-bottom: 15px;
          max-height: 80px;
          overflow: hidden;
        }
        .goods-price {
          font-size: 1.4em;
          font-weight: bold;
          color: #111;
          margin-bottom: 30px;
        }
      }
    }
  }
  .carousel-btn-list {
    position: absolute;
    top: 150px;
    right: 10px;
    width: 10px;
    text-align: right;
    li {
      display: block;
      width: 8px;
      height: 8px;
      background: transparent;
      border-radius: 5px;
      border: 1px solid #111;
      margin-bottom: 12px;
      cursor: pointer;
      float: right;
      &.active {
        width: 30px;
        background: #111;
        transition: 0.8s all;
      }
    }
  }
  .carousel-computed {
    position: absolute;
    right: 15px;
    bottom: 30px;
    color: #333;
    font-weight: bold;
  }
  .btn-buy {
    border: 2px #222 solid;
    font-size: 1.1em;
    font-weight: bold;
    color: #222;
    width: 140px;
    padding: 5px 10px;
    background: transparent;
    cursor: pointer;
    i {
      display: none;
    }
    &:hover {
      border: 2px #222 solid;
      background: #222;
      color: #fff;
      transition: 0.5s all;
      i {
        display: inline-block;
      }
    }
  }
}
.page-body {
  margin-bottom: 50px;
  .man-selling-box,
  .lady-selling-box {
    margin-top: 15px;
    .selling-title {
      padding: 5px;
      font-size: 20px;
      font-weight: bold;
      color: #262626;
      border-bottom: 2px solid #262626;
    }
    .selling-more {
      height: 32px;
      line-height: 32px;
      padding: 5px;
      color: #888;
    }
    .selling-box-main {
      padding: 20px 0;
      .selling-box-list {
        width: 240px;
        background: #fff;
        box-shadow: 0 0 5px #aaa, 0 1px 15px #aaa;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 25px;
        }
        .list-tag {
          color: #ccc;
          font-weight: bold;
          font-size: 0.8em;
          padding: 8px;
        }
        .goods-name {
          text-align: center;
          color: #262626;
          font-weight: bold;
          position: relative;
          height: 28px;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 8px;
          &:after {
            content: '';
            position: absolute;
            bottom: 0px;
            border-top: 2px solid #222;
            width: 40px;
            left: 40%;
          }
        }
        .goods-img {
          text-align: center;
          padding: 12px 0 0;
        }
        .goods-price,
        .goods-detail {
          padding: 8px;
          font-weight: bold;
          color: #262626;
        }
        .goods-detail {
          i {
            display: none;
          }
        }
        &:hover {
          .goods-img {
            transform: translateY(-12px);
            transition: 1s all;
          }
          .goods-detail {
            i {
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .man-selling-box {
    margin-bottom: 35px;
  }
}
</style>
