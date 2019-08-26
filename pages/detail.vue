<template>
  <div id="Detail">
    <div class="container">
      <div id="goods"
           class="goods-box">
        <div class="goods-img-box fl">
          <img :src="goodsimg"
               width="300"
               height="375">
        </div>
        <!--goods-img-box-->
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
        <!--goods-info-box-->
        <div class="clear"></div>
      </div>
      <!--goods-box-->
      <div id="recommend"
           class="recommend-box">
        <p class="recommend-title">猜你喜欢</p>
        <div class="recommend-box-main">
          <div v-for="(item,index) in recommendSelling"
               :key="index"
               class="recommend-box-list fl">
            <a :href="'goods.html?id='+item.id">
              <p class="goods-name">{{ item.name }}</p>
              <p class="goods-img">
                <svg viewBox="0 0 300 375"
                     width="200"
                     height="250">
                  <g>
                    <path d="m185,39 c-6,21 -21,36 -38,36 c-17,0 -32,-15 -38,-36 l-94,55 l26,86 l29,-17 l0,176 l155,0 l0,-175 l28,16 l26,-86 l-94,-55 l0,0z"
                          fill="#4c4c4c" />
                    <ellipse ry="11.5"
                             rx="11.5"
                             cy="173"
                             cx="124"
                             fill="#c48552" />
                    <path d="m99,252 l24,-34 l24,34 l-48,0z"
                          fill="#c48552" />
                    <path d="m134,252 l33,-64 l33,64 l-65,0z"
                          fill="#c48552" />
                  </g>
                </svg>
              </p>
              <p class="goods-price fl"><i class="fa fa-jpy"></i> {{ item.price }}</p>
              <p class="goods-detail fr">Detail <i class="fa fa-long-arrow-right"></i></p>
              <div class="clear"></div>
            </a>
          </div>
          <!--selling-box-list-->
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '~/plugins/axios'
export default {
  name: 'Detail',
  data () {
    return {
      recommendSelling: []
    }
  },
  async asyncData ({ route }) {
    const { data } = await get('/detail', {
      ...route.query
    })
    return {
      goodsname: data.goodsname,
      goodsdetail: data.goodsdetail,
      goodsprice: data.goodsprice,
      goodsimg: `http://localhost:3001/goodsimg/${data.goodsimg}`
    }
  },
  methods: {
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
  margin-right: 30px;
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
