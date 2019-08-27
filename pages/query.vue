<template>
  <div id="Query">
    <div class="container">
      <div id="product"
           class="product-box">
        <div class="filter-box fl">
          <p class="filter-text">筛选条件
            <a class="fr"
               href="javascript:void(0)"
               @click="clearAll">清除</a>
          </p>
          <p class="filter-title">价格</p>
          <div class="filter-price">
            <input v-model.lazy="minPrice"
                   type="text"
                   class="price-input"
                   name="minPrice"
                   @blur="checkminPrice">
            <span class="line-middle"></span>
            <input v-model.lazy="maxPrice"
                   type="text"
                   class="price-input"
                   name="maxPrice"
                   @blur="checkmaxPrice">
            <button class="price-btn"
                    @click="priceChoice">
              确定
            </button>
          </div>
          <p class="filter-title">性别</p>
          <ul class="filter-list">
            <li @click="handleSexChange">
              <input type="radio"
                     name="sex"
                     :value="1"
                     class="hidden">
              <label for="sex"
                     class="filter-label">
                <i class="fa fa-fw"
                   :class="sex==1?'fa-square':'fa-square-o'"></i> 男士
              </label>
            </li>
            <li @click="handleSexChange">
              <input type="radio"
                     name="sex"
                     :value="2"
                     class="hidden">
              <label for="sex"
                     class="filter-label">
                <i class="fa fa-fw"
                   :class="sex==2?'fa-square':'fa-square-o'"></i> 女士
              </label>
            </li>
          </ul>
          <p class="filter-title">分类</p>
          <ul class="filter-list">
            <li @click="handleClassifyChange">
              <input type="radio"
                     name="classify"
                     :value="1"
                     class="hidden">
              <label for="classify"
                     class="filter-label">
                <i class="fa fa-fw"
                   :class="classify==1?'fa-square':'fa-square-o'"></i> 衣服
              </label>
            </li>
            <li @click="handleClassifyChange">
              <input type="radio"
                     name="classify"
                     :value="2"
                     class="hidden">
              <label for="classify"
                     class="filter-label">
                <i class="fa fa-fw"
                   :class="classify==2?'fa-square':'fa-square-o'"></i> 裤子
              </label>
            </li>
            <li @click="handleClassifyChange">
              <input type="radio"
                     name="classify"
                     :value="3"
                     class="hidden">
              <label for="classify"
                     class="filter-label">
                <i class="fa fa-fw"
                   :class="classify==3?'fa-square':'fa-square-o'"></i> 鞋子
              </label>
            </li>
          </ul>
        </div>
        <div class="product-list-box fl">
          <p class="product-text">全部商品(<span>{{ total }}</span>)</p>
          <p class="product-order fl">
            <select v-model="order"
                    @change="handleOrderChange">
              <option value="default">综合</option>
              <option value="low">价格从低到高</option>
              <option value="high">价格从高到低</option>
            </select>
          </p>
          <p v-cloak
             class="product-pagination fr">
            <a v-if="page!=1"
               class="prev"
               @click="turnPagePrev"><i class="fa fa-long-arrow-left fa-fw"></i></a>
            <a v-if="page>1"
               class="num"
               @click="turnPage">1</a>
            <span v-if="page>3"
                  class="dots">...</span>
            <a v-if="page>2"
               class="num"
               @click="turnPage">{{ page-1 }}</a>
            <a class="num active"
               @click="turnPage">{{ page }}</a>
            <a v-if="page<pages"
               class="num"
               @click="turnPage">{{ page+1 }}</a>
            <span v-if="page<pages-2"
                  class="dots">...</span>
            <a v-if="page<pages-1"
               class="num"
               @click="turnPage">{{ pages }}</a>
            <a v-if="page!=pages"
               class="next"
               @click="turnPageNext"><i class="fa fa-long-arrow-right fa-fw"></i></a>
          </p>
          <div class="clear"></div>
          <p v-if="total==0"
             class="without-goods">
            没有找到合适条件的商品!
          </p>
          <ul class="product-list">
            <li v-for="(item,index) in productList"
                :key="index">
              <nuxt-link :to="{path: 'detail', query: {id: item.goodsid}}">
                <p class="goods-img">
                  <img :src="item.goodsimg"
                       width="180"
                       height="225">
                </p>
                <p class="goods-name">{{ item.goodsname }}</p>
                <p class="goods-detail">{{ item.goodsdetail }}</p>
                <p class="goods-price">&yen;{{ item.goodsprice }}</p>
              </nuxt-link>
            </li>
          </ul>
          <!--product-list-->
          <p class="product-pagination fr">
            <a v-if="page!=1"
               class="prev"
               @click="turnPagePrev"><i class="fa fa-long-arrow-left fa-fw"></i></a>
            <a v-if="page>1"
               class="num"
               @click="turnPage">1</a>
            <span v-if="page>3"
                  class="dots">...</span>
            <a v-if="page>2"
               class="num"
               @click="turnPage">{{ page-1 }}</a>
            <a class="num active"
               @click="turnPage">{{ page }}</a>
            <a v-if="page<pages"
               class="num"
               @click="turnPage">{{ page+1 }}</a>
            <span v-if="page<pages-2"
                  class="dots">...</span>
            <a v-if="page<pages-1"
               class="num"
               @click="turnPage">{{ pages }}</a>
            <a v-if="page!=pages"
               class="next"
               @click="turnPageNext"><i class="fa fa-long-arrow-right fa-fw"></i></a>
          </p>
          <div class="clear"></div>
        </div>
        <!--product-list-box-->
        <div class="clear"></div>
      </div>
      <!--search-box-->
    </div>
    <!--container-->
  </div>
</template>

<script>
import { get } from '~/plugins/axios'
export default {
  name: 'Query',
  data () {
    return {
      pageSize: 12,
      sex: '',
      classify: '',
      minPrice: '',
      maxPrice: '',
      order: 'default',
      word: ''
    }
  },
  async asyncData ({ route }) {
    const { data } = await get('query', {
      ...route.query
    })
    const productList = data.items.map(item => {
      item.goodsimg = `http://localhost:3001/goodsimg/${item.goodsimg}`
      return item
    })
    return {
      ...route.query,
      productList,
      page: ~~data.page,
      pages: Math.ceil(data.total / 12),
      total: ~~data.total
    }
  },
  methods: {
    handleSexChange (e) {
      this.sex = this.sex == e.currentTarget.firstChild.value ? '' : e.currentTarget.firstChild.value
      this.page = 1
      this.getData()
    },
    handleClassifyChange (e) {
      this.classify = this.classify == e.currentTarget.firstChild.value ? '' : e.currentTarget.firstChild.value
      this.page = 1
      this.getData()
    },
    handleOrderChange () {
      this.page = 1
      this.getData()
    },
    clearAll () {
      this.sex = ''
      this.classify = ''
      this.minPrice = ''
      this.maxPrice = ''
      this.order = 'default'
      this.page = 1
      this.getData()
    },
    turnPage (e) {
      this.page = parseInt(e.target.textContent)
      this.getData()
    },
    turnPagePrev () {
      this.page--
      this.getData()
    },
    turnPageNext () {
      this.page++
      this.getData()
    },
    checkminPrice () {
      const _minPrice = Number.parseInt(this.minPrice) || 0
      const _maxPrice = Number.parseInt(this.maxPrice) || 9999
      this.minPrice = _minPrice > _maxPrice ? 0 : (_minPrice < 0 ? 0 : _minPrice)
    },
    checkmaxPrice () {
      const _minPrice = Number.parseInt(this.minPrice) || 0
      const _maxPrice = Number.parseInt(this.maxPrice) || 9999
      this.maxPrice = _maxPrice < _minPrice ? 9999 : (_maxPrice > 9999 ? 9999 : _maxPrice)
    },
    priceChoice () {
      this.pageActive = 1
      this.getData()
    },
    async getData () {
      const { page, sex, classify, minPrice, maxPrice, order, word } = this
      const params = { page, sex, classify, minPrice, maxPrice, order, word }
      Object.keys(params).map(item => {
        if (params[item] === '') {
          delete params[item]
        }
      })
      const { data } = await get('query', {
        ...params
      })
      const productList = data.items.map(item => {
        item.goodsimg = `http://localhost:3001/goodsimg/${item.goodsimg}`
        return item
      })
      this.productList = productList
      this.total = data.total
      this.pages = Math.ceil(data.total / 12)
      this.$router.push({
        path: '/query',
        query: { ...params }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
#Query {
  padding: 20px 0;
}
.product-box {
  width: 1040px;
  background: #fff;
  box-shadow: 0 0 5px #aaa, 0 1px 15px #aaa;
  padding: 10px;
  min-height: 400px;
}

.filter-box {
  width: 200px;
  padding: 8px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.filter-box input {
  display: block;
}
.filter-label {
  /* pointer-events:none */
  cursor: pointer;
  i.fa {
    vertical-align: middle;
  }
}
p.filter-text {
  font-size: 0.9em;
  color: #888;
}
p.filter-title {
  margin-top: 25px;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 0.8em;
  color: #262626;
}
ul.filter-list > li {
  margin-bottom: 5px;
  cursor: pointer;
}
.filter-price input.price-input {
  width: 40px;
  display: inline-block;
  outline: none;
  box-sizing: border-box;
  height: 24px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #262626;
}
.filter-price .line-middle {
  display: inline-block;
  margin: 0 8px;
  width: 10px;
  font-size: 0;
  height: 24px;
  vertical-align: bottom;
  position: relative;
}
.filter-price .line-middle:before {
  content: "";
  position: absolute;
  top: 50%;
  width: 100%;
  border-top: 1px solid #262626;
}
.filter-price button.price-btn {
  margin-left: 15px;
  box-sizing: border-box;
  height: 24px;
  border: 1px solid #262626;
  text-align: center;
  width: 45px;
  background: transparent;
  cursor: pointer;
}
.filter-price button.price-btn:hover {
  background: #262626;
  color: #fff;
  transition: 0.6s all;
}

.product-list-box {
  padding: 8px;
  padding-left: 15px;
  min-height: 400px;
  border-left: 1px solid #ccc;
}
.product-list-box > p.product-text {
  font-size: 1.2em;
  font-weight: bold;
  color: #262626;
}
ul.product-list {
  width: 790px;
  padding: 15px 0;
}
ul.product-list > li {
  display: inline-block;
  width: 195px;
  text-align: center;
  border: 1px solid transparent;
  padding: 10px 5px;
  margin-bottom: 10px;
}
ul.product-list > li:hover {
  border: 1px solid #111;
}
ul.product-list > li:hover p.goods-img {
  transform: translateY(-8px);
  transition: 0.6s all;
}
ul.product-list > li a {
  display: inline-block;
  width: 180px;
}
ul.product-list > li p.goods-img {
  width: 180px;
}
ul.product-list > li p.goods-name {
  font-size: 1em;
  font-weight: bold;
  line-height: 18px;
  max-height: 18px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: #111;
}
ul.product-list > li p.goods-detail {
  font-size: 0.8em;
  font-weight: bold;
  line-height: 18px;
  max-height: 18px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: #999;
}
ul.product-list > li p.goods-price {
  font-size: 0.9em;
  font-weight: bold;
  line-height: 18px;
  max-height: 18px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: #111;
}
p.product-order,
p.product-pagination {
  margin-top: 15px;
}
p.product-order select {
  box-sizing: border-box;
  height: 28px;
  font-size: 0.8em;
  font-weight: bold;
  padding-left: 6px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: none;
  outline: none;
  cursor: pointer;
}
p.product-pagination {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
p.product-pagination a {
  display: inline-block;
  font-weight: bold;
  cursor: pointer;
  width: 24px;
  text-align: center;
  position: relative;
  color: #262626;
}
p.product-pagination a.active:after {
  position: absolute;
  content: "";
  width: 24px;
  bottom: -3px;
  left: 0;
  border-bottom: 1px solid #262626;
}
p.product-pagination a.prev,
p.product-pagination a.next {
  margin: 0 5px;
}
p.without-goods {
  line-height: 300px;
  text-align: center;
  color: #888;
  font-size: 0.9em;
}
</style>
