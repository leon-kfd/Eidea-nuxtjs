<template>
  <div id="Cart"
       class="shopping-cart-box"
       :class="{'show-mask': cartActive}"
       @click="cartActive=false">
    <div id="ShoppingCartBtn"
         class="shopping-cart-btn"
         :class="{active:!cartActive,'shopping-cart-btn-after':cartActive}"
         @click.stop="showCart">
      <div :class="{'i-rotate':cartActive}">
        <i v-if="!cartActive"
           class="fa fa-shopping-basket fa-fw"></i>
        <i v-else
           class="fa fa-times fa-fw"></i>
      </div>
      <div v-if="cartGoodsList.length!=0"
           class="new-active">{{ cartGoodsList.length }}</div>
    </div>
    <div class="shopping-cart-main"
         :class="{'shopping-cart-main-after':cartActive}"
         @click.stop="nothing">
      <div class="shopping-cart-title">
        <span>购物车</span>
      </div>
      <div class="shopping-cart-list">
        <div v-if="!username"
             class="shopping-cart-unlogin">
          请先登录...<nuxt-link to="/login"
                     class="to-login">登录</nuxt-link>
        </div>
        <div v-else-if="username && cartGoodsList.length===0"
             class="shopping-cart-empty">
          购物车里没有商品...
        </div>
        <table v-else
               class="shopping-cart-table">
          <tr v-for="(item,index) in cartGoodsList"
              :key="index">
            <td class="goods-picture">
              <img :src="item.goodsimg"
                   width="48"
                   height="60">
            </td>
            <td class="goods-name">
              <p class="name">{{ item.goodsname }}</p>
              <p class="detail">{{ item.goodsdetail }}</p>
            </td>
            <td class="goods-price">
              <p>
                <i class="fa fa-jpy"
                   aria-hidden="true"></i>
                <span>{{ item.goodsprice*item.quantity }}</span>
              </p>
              <div class="goods-quantity">
                <button class="btn-reduce"
                        @click="reduceGoods(item)">
                  <i class="fa fa-minus"
                     aria-hidden="true"></i>
                </button>
                <input v-model.lazy="item.quantity"
                       type="text"
                       @blur="checkGoodsQuantity(item)">
                <button class="btn-add"
                        @click="addGoods(item)">
                  <i class="fa fa-plus"
                     aria-hidden="true"></i>
                </button>
              </div>
            </td>
            <td class="goods-delete">
              <span class="goods-delete-btn"
                    @click="removeGoods(item.goodsid, index)">
                <i class="fa fa-times"></i>
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div class="shopping-cart-total">
        <p>Total: <i class="fa fa-jpy"
             aria-hidden="true"></i>
          <span>{{ priceTotal }}</span>
          <span class="arrow"><i class="fa fa-long-arrow-right"
               aria-hidden="true"></i></span>
        </p>
      </div>
    </div>
    <!--shopping-cart-main-->
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      cartActive: false,
      cartGoodsList: []
    }
  },
  computed: {
    priceTotal () {
      let priceTotal = 0
      this.cartGoodsList.map(result => {
        priceTotal += ~~(result.goodsprice * result.quantity)
      })
      return priceTotal
    },
    username () {
      return this.$store.state.username
    }
  },
  watch: {
    '$store.state.username': {
      immediate: true,
      handler () {
        this.getCartGoodsList()
      }
    },
    '$store.state.needRefreshCart' (val) {
      if (val) {
        this.getCartGoodsList()
      }
    }
  },
  methods: {
    // ...mapActions({
    //   getCartGoodsList: 'cart/getCartGoodsList'
    // }),
    async getCartGoodsList () {
      if (this.username) {
        const { data: cartGoodsList } = await this.$get('getCartGoodsList')
        this.cartGoodsList = cartGoodsList.map(item => {
          item.goodsimg = `${this.$baseURL}goodsimg/${item.goodsimg}`
          return item
        })
        this.$store.commit('updateNeedRefreshCart', false)
      } else {
        this.cartGoodsList = []
      }
    },
    nothing () {},
    showCart () {
      this.cartActive = !this.cartActive
    },
    reduceGoods (item) {
      if (item.quantity > 1) {
        item.quantity--
        this.changeCartQuantity(item.goodsid, item.quantity)
      }
    },
    addGoods (item) {
      if (item.quantity < 20) {
        item.quantity++
        this.changeCartQuantity(item.goodsid, item.quantity)
      }
    },
    removeGoods (goodsid, index) {
      this.$post('removeCartGoods', {
        goodsid
      }).then(data => {
        this.cartGoodsList.splice(index, 1)
      }, data => {
        alert('服务端异常')
      })
    },
    checkGoodsQuantity (item) {
      const num = ~~(item.quantity) || 1
      item.quantity = num > 20 ? 20 : (num < 1 ? 1 : num)
      this.changeCartQuantity(item.goodsid, item.quantity)
    },
    changeCartQuantity (goodsid, quantity) {
      this.$post('setCartGoods', {
        goodsid,
        quantity
      }).then(data => {
        // console.log(data)
      }, data => {
        alert('服务端异常')
        this.getCartGoodsList()
      })
    }
  }

}
</script>
<style lang='scss' scoped>
/*--shopping-cart--*/
.shopping-cart-box {
  position: fixed;
  background: #fff;
  bottom: 10%;
  left: 50%;
  margin-left: 600px;
  /*box-shadow: 0 2px 10px #444,0 2px 15px #444;*/
  &.show-mask {
    &:after {
      position: fixed;
      content: "";
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
@media screen and (max-width: 1280px) {
  .shopping-cart-box {
    position: fixed;
    background: #fff;
    bottom: 10%;
    right: 50px;
    left: auto;
    margin-left: 0;
    /*box-shadow: 0 2px 10px #444,0 2px 15px #444;*/
  }
}

.shopping-cart-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 80;
  width: 48px;
  height: 48px;
  background: #fff;
  color: #262626;
  text-align: center;
  line-height: 48px;
  font-size: 28px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 12px #444;
  cursor: pointer;
}
.new-active {
  position: absolute;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  width: 0;
  height: 0;
  line-height: 24px;
  background: #e94b35;
  border-radius: 50%;
  box-shadow: 0 0 8px #e94b35;
  top: 0px;
  right: 0px;
  overflow: hidden;
  transition: 0.8s cubic-bezier(0.68, -0.55, 0.27, 0.55);
}
.active > .new-active {
  width: 24px;
  height: 24px;
  transition: 0.8s cubic-bezier(0.68, -0.55, 0.27, 0.55);
  top: -10px;
  right: -10px;
}
.shopping-cart-main {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 48px;
  width: 48px;
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px #444;
  z-index: 50;
  transition: 0.8s cubic-bezier(0.68, -0.55, 0.27, 0.55);
}
.shopping-cart-main-after {
  height: 450px;
  width: 350px;
  transition: 0.8s ease-out;
}
.shopping-cart-btn-after {
  border-radius: 0 0 8px 0;
  box-shadow: none;
  transition: 0.8s cubic-bezier(0.68, -0.55, 0.27, 0.55);
}
/*shopping-cart-title*/
.shopping-cart-title {
  height: 40px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
.shopping-cart-title > span {
  display: inline-block;
  padding: 0 8px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #262626;
}
/*shopping-cart-total*/
.shopping-cart-total {
  position: absolute;
  width: 100%;
  background: #337788;
  height: 48px;
  border: 1px solid #337788;
  bottom: 0;
  right: 46px;
  cursor: pointer;
}
.shopping-cart-total p {
  text-align: center;
  line-height: 48px;
  font-size: 18px;
  color: #fff;
  padding-left: 20px;
}
.shopping-cart-total p > span {
  font-size: 24px;
}
.shopping-cart-total p > span.arrow {
  margin-left: 8px;
  display: none;
}
.shopping-cart-total:hover > p > span.arrow {
  display: inline-block;
}
.i-rotate {
  transform: rotate(-360deg);
  transition: 0.8s cubic-bezier(0.68, -0.55, 0.27, 0.55);
}
/*shopping-cart-list*/
.shopping-cart-list {
  height: 360px;
  overflow: auto;
}
table.shopping-cart-table {
  padding: 5px 0;
  width: 100%;
  border-spacing: 0;
}
table.shopping-cart-table td {
  border-bottom: 1px solid #ccc;
  padding: 5px 0 5px 5px;
}
table.shopping-cart-table tr:last-child > td {
  border-bottom: none;
}
table.shopping-cart-table tr:hover {
  background: #f0f0f0;
}
table.shopping-cart-table td > img {
  vertical-align: middle;
  text-align: center;
  width: 48px;
  height: 60px;
}
td.goods-price {
  width: 90px;
}
td.goods-price p {
  text-align: center;
}
td.goods-price p:first-child {
  font-size: 16px;
  margin-bottom: 3px;
}
td.goods-name {
  width: 190px;
  padding-left: 10px !important;
}
td.goods-name .name {
  width: 180px;
  height: 18px;
  font-size: 0.9em;
  font-weight: bold;
  color: #111;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
td.goods-name .detail {
  width: 180px;
  color: #888;
  height: 18px;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-quantity {
  width: 70px;
  margin: 0 auto;
  overflow: hidden;
}
.goods-quantity > input {
  box-sizing: border-box;
  height: 18px;
  font-size: 12px;
  font-weight: bold;
  width: 24px;
  text-align: right;
  padding-right: 5px;
  float: left;
  border: 1px solid #262626;
  border-radius: 0;
  outline: none;
}
.goods-quantity > button {
  box-sizing: border-box;
  text-align: center;
  font-size: 12px;
  height: 18px;
  float: left;
  border-radius: 0;
  width: 20px;
  padding: 0;
  border: 1px solid #262626;
  background: transparent;
  outline: none;
  cursor: pointer;
}
.goods-quantity > button:first-child {
  border-radius: 4px 0 0 4px;
}
.goods-quantity > button:last-child {
  border-radius: 0 4px 4px 0;
}
.goods-quantity > button:hover {
  color: #fff;
  background: #262626;
}
.goods-delete {
  width: 18px;
  font-size: 20px;
  font-weight: bold;
  color: #cc3333;
  padding: 0 5px 0 0 !important;
  .goods-delete-btn {
    cursor: pointer;
  }
}
.goods-delete i {
  visibility: hidden;
}
table.shopping-cart-table tr:hover .goods-delete i {
  visibility: visible;
}
.shopping-cart-empty,
.shopping-cart-unlogin {
  text-align: center;
  height: 350px;
  line-height: 350px;
  color: #888;
  .to-login {
    margin-left: 8px;
    color: #4488ff;
    &:hover {
      color: #eea066;
    }
  }
}
</style>
