// const path = require('path')
const Router = require('koa-router')
const router = new Router({
  prefix: '/api'
})

router.get('/test', (ctx) => {
  ctx.body = 'hello koa'
})

module.exports = router
