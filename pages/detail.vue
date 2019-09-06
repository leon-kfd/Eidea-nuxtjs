<template>
  <div id="Detail">
    <div class="container">
      <div id="goods"
           class="goods-box">
        <div class="goods-img-box fl">
          <img v-lazy="goodsimg"
               width="300"
               height="375">
        </div>
        <div class="goods-info-box fl">
          <p class="goods-name">{{ goodsname }}</p>
          <p class="goods-detail">{{ goodsdetail }}</p>
          <p class="goods-price">&yen; {{ goodsprice }}</p>
          <div class="goods-specifications-box">
            <p style="text-align:center;color:#999">规格选择模块</p>
          </div>
          <div class="goods-purchase-box">
            <button class="btn-heart fl"><i class="fa fa-heart-o fa-fw"></i></button>
            <button class="btn-purchase fl"
                    @click="addShoppingcart">放入购物车 <i class="fa fa-long-arrow-right"></i></button>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div id="recommend"
           class="recommend-box">
        <p class="recommend-title">猜你喜欢</p>
        <div class="recommend-box-main">
          <div v-for="(item,index) in recommendList"
               :key="index"
               class="recommend-box-list fl">
            <nuxt-link :to="{path: 'detail', query: {id: item.goodsid}}">
              <p class="goods-name">{{ item.goodsname }}</p>
              <p class="goods-img">
                <img v-lazy="item.goodsimg"
                     width="200"
                     height="250">
              </p>
              <p class="goods-price fl"><i class="fa fa-jpy"></i> {{ item.goodsprice }}</p>
              <p class="goods-detail fr">Detail <i class="fa fa-long-arrow-right"></i></p>
              <div class="clear"></div>
            </nuxt-link>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
    }
  },
  watch: {
    '$route.fullPath' () {
      this.getData()
    }
  },
  async asyncData ({ app, route }) {
    const { data } = await app.$get('/detail', {
      ...route.query
    })
    const { data: recommendList } = await app.$get('/recommend', {
      ...route.query
    })
    recommendList.map(item => {
      item.goodsimg = `${app.$baseURL}goodsimg/${item.goodsimg}`
      return item
    })
    return {
      goodsname: data.goodsname,
      goodsdetail: data.goodsdetail,
      goodsprice: data.goodsprice,
      goodsimg: `${app.$baseURL}goodsimg/${data.goodsimg}`,
      recommendList
    }
  },
  methods: {
    async getData () {
      const { data } = await this.$get('/detail', {
        ...this.$route.query
      })
      const { data: recommendList } = await this.$get('/recommend', {
        ...this.$route.query
      })
      recommendList.map(item => {
        item.goodsimg = `${this.$baseURL}goodsimg/${item.goodsimg}`
        return item
      })
      this.goodsname = data.goodsname
      this.goodsdetail = data.goodsdetail
      this.goodsprice = data.goodsprice
      this.goodsimg = `${this.$baseURL}goodsimg/${data.goodsimg}`
      this.recommendList = recommendList
    },
    addShoppingcart () {}
  }
}
</script>
<style lang='scss' scoped>
#Detail {
  padding: 20px 0;
}
.goods-box {
  width: 1030px;
  background: #fff;
  box-shadow: 0 0 5px #aaa, 0 1px 15px #aaa;
  padding: 10px;
  padding-bottom: 30px;
  min-height: 450px;
}
.goods-img-box {
  width: 500px;
  text-align: center;
  margin-top: 20px;
}
.goods-info-box {
  padding-top: 80px;
}
.goods-info-box > p.goods-name {
  width: 450px;
  font-size: 1.5em;
  font-weight: bold;
  color: #262626;
  margin-bottom: 15px;
  line-height: 32px;
  max-height: 96px;
  overflow: hidden;
}
.goods-info-box > p.goods-detail {
  width: 450px;
  font-size: 1.2em;
  font-weight: bold;
  color: #666;
  margin-bottom: 15px;
  max-height: 80px;
  overflow: hidden;
}
.goods-info-box > p.goods-price {
  font-size: 1.4em;
  font-weight: bold;
  color: #111;
  margin-bottom: 20px;
}
.goods-specifications-box {
  padding: 30px 0;
  border-top: 1px dashed #ccc;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 20px;
}

button.btn-heart {
  width: 60px;
  border: 1px #222 solid;
  font-size: 1.1em;
  font-weight: bold;
  color: #222;
  height: 36px;
  line-height: 26px;
  padding: 5px 10px;
  background: transparent;
  cursor: pointer;
  margin-right: 15px;
}
button.btn-heart:hover {
  color: #fff;
  background: #ff6666;
  transition: 0.5s all;
}
button.btn-purchase {
  width: 180px;
  border: 1px #222 solid;
  font-size: 1.1em;
  font-weight: bold;
  color: #fff;
  height: 36px;
  padding: 5px 10px;
  background: #222;
  cursor: pointer;
}
button.btn-purchase > i {
  display: none;
}
button.btn-purchase:hover {
  background: #444;
  transition: 0.5s all;
}
button.btn-purchase:hover > i {
  display: inline-block;
}
.recommend-box {
  margin-top: 55px;
}
.recommend-box > p.recommend-title {
  text-align: center;
  font-size: 1.8em;
  font-weight: bold;
  color: #262626;
  position: relative;
  width: 150px;
  margin: 0 auto 30px;
}
.recommend-box > p.recommend-title:before,
.recommend-box > p.recommend-title:after {
  position: absolute;
  content: "";
  top: 50%;
  width: 100px;
  border-top: 2px solid #262626;
}
.recommend-box > p.recommend-title:before {
  left: -120px;
}
.recommend-box > p.recommend-title:after {
  right: -120px;
}

/*--selling--box-list--*/
.recommend-box-list {
  width: 240px;
  background: #fff;
  box-shadow: 0 0 5px #aaa, 0 1px 15px #aaa;
  margin-bottom: 50px;
}
.recommend-box-list:not(:last-child) {
  margin-right: 24px;
}
.recommend-box-list p.goods-name {
  margin-top: 15px;
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
}
.recommend-box-list p.goods-name:after {
  content: "";
  position: absolute;
  bottom: 0px;
  border-top: 2px solid #222;
  width: 40px;
  left: 40%;
}
.recommend-box-list p.goods-img {
  text-align: center;
  padding: 12px 0 0;
}
.recommend-box-list p.goods-price,
.recommend-box-list p.goods-detail {
  padding: 8px;
  font-weight: bold;
  color: #262626;
}
.recommend-box-list p.goods-detail > i {
  display: none;
}
.recommend-box-list:hover p.goods-img {
  transform: translateY(-12px);
  transition: 1s all;
}
.recommend-box-list:hover p.goods-detail > i {
  display: inline-block;
}
</style>
