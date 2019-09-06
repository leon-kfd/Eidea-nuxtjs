export const state = () => ({
  username: ''
})

export const mutations = {
  updateUsername (state, value) {
    state.username = value
  }
}
