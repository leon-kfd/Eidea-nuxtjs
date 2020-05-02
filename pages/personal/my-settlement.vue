<template>
  <div id="MySettlement">
    <ul class="title-nav">
      <li :class="statusActive==0?'active':''"
          @click="statusActive=0">全部</li>
      <li :class="statusActive==1?'active':''"
          @click="statusActive=1">待支付</li>
      <li :class="statusActive==2?'active':''"
          @click="statusActive=2">待发货</li>
      <li :class="statusActive==3?'active':''"
          @click="statusActive=3">待收货</li>
      <li :class="statusActive==4?'active':''"
          @click="statusActive=4">已完成</li>
    </ul>
    <div class="section-body">
      <div class="section">
        <p v-if="settlementlist.length==0"
           class="without">你还没有订单</p>
        <table class="settlement-table">
          <tbody>
            <tr v-for="(item,index) in settlementlist"
                :key="index">
              <td class="goods-img">
                <svg viewBox="0 0 300 375"
                     width="100"
                     height="120">
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
              </td>
              <td class="goods-info">
                <p class="name">{{ item.goodsName }}</p>
                <p class="detail">{{ item.goodsDetail }}</p>
                <p class="specification">规格:Null</p>
                <p class="quantity">
                  <span>数量:</span>
                  <span class="num">{{ item.quantity }}</span>
                  <span class="total">&yen;{{ item.quantity*item.price }}</span>
                </p>
              </td>
              <td class="order-num">
                <p class="title">订单号</p>
                <p>{{ item.settlementNum }}</p>
              </td>
              <td class="status">
                <p>
                  <span v-if="item.status==1">待支付</span>
                  <span v-else-if="item.status==2">待发货</span>
                  <span v-else-if="item.status==3">待收货</span>
                  <span v-else-if="item.status==4">已完成</span>
                </p>
              </td>
              <td class="edit">
                <p>
                  <button v-if="item.status==1">支付订单</button>
                  <button v-else-if="item.status==2">提醒发货</button>
                  <button v-else-if="item.status==3">查看物流</button>
                  <button v-else-if="item.status==4">查看详情</button>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--section-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySettlement',
  data () {
    return {
      statusActive: 0,
      settlementlist: [
        {
          id: 1,
          goodsName: 'Dreamland Syndicate',
          goodsDetail: '字母动物印花短袖 T 恤',
          quantity: 1,
          price: 599,
          settlementNum: '0000-0000-0000',
          status: 1
        },
        {
          id: 2,
          goodsName: 'ALEXANDER MCQUEEN',
          goodsDetail: '迷彩圆领卫衣',
          quantity: 2,
          price: 6200,
          settlementNum: '0000-0000-0000',
          status: 2
        },
        {
          id: 3,
          goodsName: 'OFF-WHITE c/o VIRGIL',
          goodsDetail: '饰口袋印花迷彩双肩包',
          quantity: 1,
          price: 5899,
          settlementNum: '0000-0000-0000',
          status: 3
        },
        {
          id: 4,
          goodsName: 'ACNE STUDIOS',
          goodsDetail: '短款水洗牛仔夹克',
          quantity: 1,
          price: 3000,
          settlementNum: '0000-0000-0000',
          status: 4
        }
      ]
    }
  },
  computed: {
    activeSettlementlist () {
      return this.settlementlist.filter(item => this.statusActive == 0 ? true : item.status == this.statusActive)
    }
  }
}
</script>
<style lang='scss' scoped>
ul.title-nav {
  border-bottom: 2px solid #111;
  li {
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    &.active {
      border: 2px solid #111;
      border-bottom: none;
      font-weight: bold;
    }
  }
}
p.without {
  text-align: center;
  line-height: 250px;
  color: #888;
  font-size: 14px;
}
table.settlement-table {
  width: 100%;
  box-sizing: border-box;
  padding-top: 15px;
}
table.settlement-table td {
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
}
td.goods-img {
  width: 160px;
}
td.goods-info {
  text-align: left !important;
  padding-right: 20px;
  padding-left: 10px !important;
}
td.statue,
td.edit {
  width: 110px;
}
td.goods-info p.name {
  font-size: 1em;
  font-weight: bold;
  line-height: 20px;
  max-height: 20px;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
td.goods-info p.detail {
  font-size: 0.8em;
  line-height: 18px;
  max-height: 18px;
  width: 250px;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8px;
}
td.goods-info p.specification,
td.goods-info p.quantity {
  font-size: 0.8em;
  line-height: 18px;
  max-height: 18px;
  width: 250px;
  color: #888;
}
td.goods-info p.quantity .num,
td.goods-info p.quantity .total {
  font-size: 1em;
  font-weight: bold;
  color: #111;
  margin-right: 25px;
}
td.order-num p.title {
  font-size: 0.8em;
  color: #888;
  margin-bottom: 10px;
}
td.statue p {
  color: #888;
}
td.edit p > button {
  box-sizing: border-box;
  width: 85px;
  height: 32px;
  background: transparent;
  border: 2px solid #111;
  color: #111;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
}
td.edit p > button:hover {
  color: #fff;
  background: #111;
  transition: 0.4s all;
}
</style>
