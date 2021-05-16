const jwt = require('koa-jwt')
const { goodsPrefix,secret } = require('../utils/config')
const Router = require('koa-router')
const router = new Router({ prefix: goodsPrefix })
const {
  find,
  findById,
  findByCategory,
  create,
  update,
  updateViews,
  delete: del,
  checkGoodsExist,
  checkPublisher,
} = require('../controllers/goods')

const auth = jwt({ secret })

router.get('/', find)

router.get('/category', findByCategory)

router.post('/', auth, create)

router.get('/:id', checkGoodsExist, findById)

router.patch('/:id', auth, checkGoodsExist, updateViews) // 更新浏览量

router.patch('/:id', auth, checkGoodsExist, checkPublisher, update)

router.delete('/:id', auth, checkGoodsExist, checkPublisher, del) // 删除商品信息

module.exports = router
