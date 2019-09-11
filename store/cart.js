import { get, post } from '@/plugins/axios'
export const state = () => ({
  cartGoodsList: []
})

export const mutations = {
  updateCartGoodsList (state, value) {
    state.cartGoodsList = value
  }
}

export const actions = {
  async getCartGoodsList ({ state, rootState, commit }) {
    const { data } = await get('getCartGoodsList')
    const cartGoodsList = data.data.map(item => {
      item.goodsimg = `${this.$baseURL}goodsimg/${item.goodsimg}`
      return item
    })
    commit('updateCartGoodsList', cartGoodsList)
  },
  setCartGoods ({ commit }, type, value) {
    let quantity = ~~value.quantity || 1
    switch (type) {
      case 1:
        if (quantity > 1) { quantity-- }
        break
      case 2:
        if (quantity < 100) { quantity++ }
        break
      case 3:
        quantity = quantity > 20 ? 20 : (quantity < 1 ? 1 : quantity)
        break
    }
    post('setCartGoods', {
      id: value.goodsid,
      quantity: value.quantity
    }).then(data => {

    }, data => {

    })
  }
}
