const jwt = require('koa-jwt')
const { purchasesPrefix, secret } = require('../utils/config')
const Router = require('koa-router')
const router = new Router({ prefix: purchasesPrefix })
const {
  find,
  findById,
  create,
  update,
  delete: del,
  checkPurchaseExist,
  checkPublisher,
} = require('../controllers/purchases')

const auth = jwt({ secret })

router.get('/', find)

router.post('/', auth, create)

router.get('/:id', checkPurchaseExist, findById)

router.put('/:id', auth, checkPurchaseExist, update)

router.delete('/:id', auth, checkPurchaseExist, checkPublisher, del) // 删除商品信息

module.exports = router
