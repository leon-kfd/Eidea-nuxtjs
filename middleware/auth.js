export default ({ store, route, redirect }) => {
  const rejectRouter = [
    '/personal/my-settlement',
    '/personal/personal-info',
    '/settlement'
  ]
  if (rejectRouter.includes(route.path) && !store.state.username) {
    redirect('/')
  }
}
