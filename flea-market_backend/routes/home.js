const Router = require('koa-router')
const router = new Router()
const { homePrefix, upLoadPrefix } = require('../utils/config')
const { upload } = require('../controllers/home')

router.get(homePrefix, (ctx) => {
  ctx.body = '<h1>主页</h1>'
})

router.post(upLoadPrefix, upload)

module.exports = router
