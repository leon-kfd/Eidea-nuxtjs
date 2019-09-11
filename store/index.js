export const state = () => ({
  username: '',
  needRefreshCart: false
})

export const mutations = {
  updateUsername (state, value) {
    state.username = value
  },
  updateNeedRefreshCart (state, value) {
    state.needRefreshCart = value
  }
}
