<template>
  <div id="MyCollection">
    <div class="section-body">
      <div class="section">
        <p v-if="collectionlist.length==0"
           class="without">没有收藏的商品</p>
        <table class="collection-table">
          <tbody>
            <tr v-for="(item,index) in collectionlist"
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
              </td>
              <td class="goods-price">
                <p class="title">单价</p>
                <p>&yen;{{ item.goodsPrice }}</p>
              </td>
              <td class="delete">
                <button>删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCollection',
  data () {
    return {
      collectionlist: []
    }
  }
}
</script>
<style lang='scss' scoped>
p.without {
  text-align: center;
  line-height: 250px;
  color: #888;
  font-size: 14px;
}
</style>
