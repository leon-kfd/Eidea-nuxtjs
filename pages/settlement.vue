<template>
  <div id="Settlement">
    <div class="container">
      <div v-cloak
           class="settlement-box">
        <div class="left-box fl">
          <div class="settlement-express">
            <p class="title">配送信息</p>
            <div class="history-box">
              <p class="history-title">已保存地址</p>
              <div class="history-address">
                <p class="address1">
                  <span class="province">XXXX</span>
                  <span class="city">XXXX</span>
                  <span class="district">XXX</span>
                  <span class="name fr">Username</span>
                </p>
                <p class="address2 fl">XXXXXXXXXXXXXX</p>
                <p class="tel fr">130XXXXXXXX</p>
                <div class="clear"></div>
              </div>
            </div>
            <div class="express-input">
              <div class="form-group">
                <div class="form-input-el w50">
                  <label>收件人</label>
                  <input v-model.lazy="recipients"
                         type="text"
                         name=""
                         @blur="inputCheck">
                </div>
                <div class="form-input-el w50">
                  <label>手机</label>
                  <input v-model.lazy="tel"
                         type="text"
                         name=""
                         @blur="inputCheck">
                </div>
              </div>
              <div class="form-group">
                <div class="form-input-el w33">
                  <label>省</label>
                  <select id=""
                          v-model.lazy="activeSelect1"
                          name=""
                          :class="activeSelect1==0?'select-default':''"
                          @change="setSelect2">
                    <option value="0"
                            selected>省份/直辖市</option>
                    <option v-for="(item,index) in select1"
                            :key="index"
                            :value="item">{{ item }}</option>
                  </select>
                </div>
                <div class="form-input-el w33">
                  <label>市</label>
                  <select id=""
                          v-model.lazy="activeSelect2"
                          name=""
                          :class="activeSelect2==0?'select-default':''"
                          @change="setSelect3">
                    <option value="0"
                            selected>市</option>
                    <option v-for="(item,index) in select2"
                            :key="index"
                            :value="item">{{ item }}</option>
                  </select>
                </div>
                <div class="form-input-el w33">
                  <label>区</label>
                  <select id=""
                          v-model.lazy="activeSelect3"
                          name=""
                          :class="activeSelect3==0?'select-default':''"
                          @change="inputCheck">
                    <option value="0"
                            selected>区/县</option>
                    <option v-for="(item,index) in select3"
                            :key="index"
                            :value="item">{{ item }}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="form-input-el w100">
                  <input v-model.lazy="addressdetail"
                         type="text"
                         class="address-input"
                         placeholder="请输入街道、门派号码等详细地址"
                         @blur="inputCheck">
                </div>
              </div>
              <div class="clear">
                <div class="form-group fr"
                     style="text-align: right">
                  <input id="saveAddress"
                         v-model="saveAddress"
                         class="check-btn"
                         type="checkbox"
                         name="saveAddress"
                         :checked="saveAddress">
                  <label class="checkbox1"
                         for="saveAddress"></label><label class="check-text">保存该地址</label>
                </div>
                <p v-if="addresserror==1"
                   class="address-error fl">请正确完善填写地址信息</p>
              </div>
            </div>
          </div>
          <div class="settlement-payment">
            <p class="title">支付方式</p>
            <div class="settlement-payment-box">
              <div class="alipay"
                   :class="paymentway=='支付宝'?'active':''"
                   @click="paymentChoice">支付宝</div>
              <div class="wechatpay"
                   :class="paymentway=='微信支付'?'active':''"
                   @click="paymentChoice">微信支付</div>
              <div class="unionpay"
                   :class="paymentway=='银联支付'?'active':''"
                   @click="paymentChoice">银联支付</div>
            </div>
            <p v-if="paymenterror==1"
               class="payment-error">请选择支付方式</p>
          </div>
        </div>
        <div class="right-box fl">
          <div class="settlement-info">
            <p class="title">订单信息</p>
            <div v-if="loadSettlementFlag"
                 class="loader-box">
              <div class="loader">
                <div class="loader-bar"></div>
                <div class="loader-bar"></div>
                <div class="loader-bar"></div>
              </div>
            </div>
            <div class="settlement-list-box">
              <dl v-for="(item,index) in settlementList"
                  :key="index"
                  class="settlement-list-item">
                <dt>
                  <img v-lazy="item.goodsimg"
                       width="120"
                       height="150" />
                </dt>
                <dd>
                  <p class="name">{{ item.goodsname }}</p>
                  <p class="detail">{{ item.goodsdetail }}</p>
                  <p class="specification">规格:Null</p>
                  <p class="quantity">数量:<span>{{ item.quantity }}</span></p>
                  <p class="total">&yen;{{ item.quantity*item.goodsprice }}</p>
                </dd>
                <div class="clear"></div>
              </dl>
            </div>
            <p class="subtotal">小计<span class="fr">&yen;{{ settlementTotal }}</span></p>
            <p class="freight">运费<span class="fr">&yen;0</span></p>
            <p class="discount">优惠<span class="fr">-&yen;0</span></p>
            <p class="sum-total">应付金额<span class="fr">&yen;{{ settlementTotal }}</span></p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
        <div class="submit-box">
          <button :class="postflage?'':'disabled'"
                  @click="checkSettlement">提交订单并支付</button>
        </div>
      </div>
      <!--settlement-box-->
    </div>
    <!--container-->
  </div>
</template>

<script>
import city from '@/static/city.json'
export default {
  name: 'Settlement',
  data () {
    return {
      recipients: '',
      tel: '',
      activeSelect1: 0,
      activeSelect2: 0,
      activeSelect3: 0,
      saveAddress: false,
      select1: [],
      select2: [],
      select3: [],
      areajson: [],
      addressdetail: '',
      paymentway: '',
      postflage: false,
      addresserror: 0,
      paymenterror: 0,
      // 订单列表
      loadSettlementFlag: false,
      settlementList: []
    }
  },
  computed: {
    settlementTotal () {
      let price_total = 0
      this.settlementList.map(result => {
        price_total += parseInt(result.goodsprice * result.quantity)
      })
      return price_total
    }
  },
  mounted () {
    this.getCity()
    this.getSettlementGoodsList()
  },
  methods: {
    async getSettlementGoodsList () {
      const { data } = await this.$get('getSettlementGoodsList')
      data.map(item => {
        item.goodsimg = `${this.$baseURL}/goodsimg/${item.goodsimg}`
      })
      this.settlementList = data
    },
    // 获取地区三级联动
    getCity () {
      this.areajson = city
      this.setSelect1()
    },
    setSelect1 () {
      for (const i in this.areajson) {
        const obj = i
        this.select1.push(obj)
      }
    },
    setSelect2 () {
      this.activeSelect2 = 0
      this.activeSelect3 = 0
      for (const i in this.areajson) {
        if (this.activeSelect1 == i) {
          this.select2 = []
          for (const j in this.areajson[i]) {
            const obj = j
            this.select2.push(obj)
          }
          break
        }
      }
      this.addressCheck()
      this.setPostfalge()
    },
    setSelect3 () {
      this.activeSelect3 = 0
      for (const i in this.areajson) {
        if (this.activeSelect1 == i) {
          for (const j in this.areajson[i]) {
            if (this.activeSelect2 == j) {
              this.select3 = []
              this.select3 = this.areajson[i][j]
              break
            }
          }
          break
        }
      }
      this.addressCheck()
      this.setPostfalge()
    },
    inputCheck (e) {
      if (e.target.value == '') {
        e.target.classList.add('error')
      } else {
        e.target.classList.remove('error')
      }
      this.addressCheck()
      this.setPostfalge()
    },
    paymentChoice (e) {
      this.paymentway = e.target.textContent
      this.paymenterror = 2
      this.setPostfalge()
    },
    addressCheck () {
      if (this.recipients != '' && this.tel != '' && this.addressdetail != '') {
        if (this.activeSelect1 != 0 && this.activeSelect2 != 0 && this.activeSelect3 != 0) {
          this.addresserror = 2
        } else {
          this.addresserror = 1
        }
      } else {
        this.addresserror = 1
      }
    },
    paymentCheck () {
      if (this.paymentway != '') {
        this.paymenterror = 2
      } else {
        this.paymenterror = 1
      }
    },
    checkSettlement () {
      this.addressCheck()
      this.paymentCheck()
    },
    setPostfalge () {
      if (this.addresserror == 2 && this.paymenterror == 2) {
        this.postflage = true
      } else {
        this.postflage = false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
#Settlement {
  padding-top: 30px;
}
.settlement-box {
  width: 100%;
  background: #fff;
  box-shadow: 0 0 5px #aaa, 0 1px 15px #aaa;
  padding: 10px;
  min-height: 500px;
  padding-bottom: 30px;
}
.settlement-info {
  box-sizing: border-box;
  width: 450px;
  min-height: 500px;
  padding-left: 10px;
  padding-right: 30px;
  margin-bottom: 20px;
}
.settlement-express,
.settlement-payment {
  width: 540px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 15px;
  margin-right: 30px;
  margin-bottom: 50px;
}
.settlement-info p.title,
.settlement-express p.title,
.settlement-payment p.title {
  padding: 10px;
  border-bottom: 2px solid #262626;
  color: #666;
  font-size: 0.9em;
  margin-bottom: 15px;
}

.history-box {
  padding: 0 10px;
  padding-right: 15px;
  margin-bottom: 25px;
}
.history-box p.history-title {
  font-size: 0.8em;
  color: #999;
}
.history-address {
  padding: 10px;
  border: 1px solid #e0e0e0;
  margin: 8px 0;
  cursor: pointer;
}
.history-address:hover {
  border: 1px solid #111;
}
.history-box .active {
  border: 1px solid #111;
}
p.address1 > span:not(:last-child) {
  margin-right: 8px;
}
p.address1,
p.address2,
p.tel {
  font-size: 0.9em;
  color: #333;
  line-height: 20px;
}
p.address2 {
  width: 350px;
  max-height: 60px;
  overflow: hidden;
}

.express-input {
  padding: 0 10px;
}
.form-input-el {
  float: left;
  margin-right: 20px;
}
.w33 {
  width: 150px;
}
.w50 {
  width: 235px;
}
.w100 {
  width: 490px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group:after {
  display: block;
  content: "";
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}
.form-group .form-input-el:last-child {
  margin-right: 0;
}
.form-input-el > label {
  display: block;
  font-size: 0.9em;
  color: #444;
  margin-bottom: 5px;
}
.form-input-el > input,
.form-input-el > select {
  box-sizing: border-box;
  font-size: 13px;
  width: 100%;
  height: 32px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 0;
  padding: 5px 9px;
  -webkit-appearance: none;
  outline: none;
}
input.error,
select.error {
  border: 1px solid #bb1111 !important;
}
.form-input-el option {
  color: #111 !important;
}
.form-input-el > select.select-default {
  color: #888;
}
.address-input {
  box-sizing: border-box;
  font-size: 13px;
  width: 100%;
  height: 32px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 0;
  padding: 5px 9px;
  -webkit-appearance: none;
  outline: none;
}
p.address-error {
  font-size: 0.9em;
  color: #bb1111;
  margin: 3px 0;
}
p.payment-error {
  font-size: 0.9em;
  color: #bb1111;
  margin-left: 15px;
}
.check-btn {
  display: none;
}
.check-btn + .checkbox1 {
  cursor: pointer;
  font-size: 14px;
  padding: 1px;
  background-color: #fff;
  border: 1px solid #262626;
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  user-select: none;
}
.check-btn:checked + .checkbox1:after {
  content: "\2714";
  position: absolute;
  font-size: 13px;
  left: 2px;
  top: -2px;
}
.check-text {
  font-size: 13px;
  color: #262626;
  user-select: none;
  padding-left: 3px;
}
.settlement-list-box {
  margin-bottom: 15px;
  max-height: 400px;
  overflow-y: auto;
}
dl.settlement-list-item {
  margin-bottom: 10px;
}
dl.settlement-list-item dt {
  float: left;
}
dl.settlement-list-item dd {
  box-sizing: border-box;
  padding-left: 110px;
  padding-top: 15px;
  height: 150px;
  position: relative;
}
dl.settlement-list-item dd p.name {
  font-size: 1em;
  color: #111;
  margin-bottom: 3px;
  font-weight: bold;
  height: 20px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
dl.settlement-list-item dd p.detail {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 15px;
  height: 20px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
dl.settlement-list-item dd p.specification,
dl.settlement-list-item dd p.quantity {
  font-size: 0.8em;
  color: #262626;
  margin-bottom: 3px;
}
dl.settlement-list-item dd p.total {
  position: absolute;
  bottom: 8px;
  right: 10px;
  font-size: 0.9em;
  color: #262626;
}
.settlement-info p.subtotal {
  padding: 0 10px;
  padding-top: 8px;
  margin-bottom: 5px;
  border-top: 2px solid #262626;
  color: #444;
  font-size: 0.9em;
}
.settlement-info p.freight,
.settlement-info p.discount {
  padding: 0 10px;
  color: #666;
  font-size: 0.9em;
  margin-bottom: 5px;
}
.settlement-info p.sum-total {
  padding: 5px 10px 0;
  color: #111;
  font-size: 1em;
  font-weight: bold;
}

.settlement-payment-box > div {
  box-sizing: border-box;
  display: inline-block;
  margin: 15px;
  margin-top: 5px;
  width: 120px;
  text-align: center;
  line-height: 40px;
  border: 2px solid #ccc;
  color: #111;
  font-size: 0.9em;
  cursor: pointer;
}
.settlement-payment-box > div:hover {
  border: 2px solid #111;
}
.settlement-payment-box > div.active {
  border: 2px solid #111;
}

.submit-box {
  padding: 10px;
  padding-right: 40px;
  margin-top: 20px;
}
.submit-box button {
  width: 100%;
  box-sizing: border-box;
  height: 42px;
  font-size: 1em;
  font-weight: bold;
  color: #fff;
  background: #111;
  border: none;
  outline: none;
  cursor: pointer;
}
.submit-box button.disabled {
  background: #888;
  cursor: not-allowed;
}
</style>
