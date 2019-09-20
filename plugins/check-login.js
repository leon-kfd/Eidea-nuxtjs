export default async ({ app, store }) => {
  const { data: username } = await app.$get('checkLogin')
  store.commit('updateUsername', username)
}
