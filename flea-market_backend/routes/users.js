const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const { usersPrefix, secret } = require('../utils/config')
const Router = require('koa-router')
const router = new Router({ prefix: usersPrefix })
const {
  find,
  findByAccount,
  create,
  checkOwner,
  update,
  delete: del,
  login,
  checkUserExist,
  listUserPublishGoods,
  listUserPublishPurchase,
} = require('../controllers/users')

const auth = jwt({ secret })

router.get('/', find)

router.post('/', create)

router.get('/:id', findByAccount)

router.patch('/:id', auth, checkOwner, update) // 确保自己只能改自己的信息 patch 更新资源部分内容

router.delete('/:id', auth, checkOwner, del) // 删除用户

router.post('/login', login)

router.get('/:id/publishGoods', checkUserExist, listUserPublishGoods) // 获取用户发布的商品

router.get('/:id/publishPurchase', checkUserExist, listUserPublishPurchase) // 获取用户发布的求购

module.exports = router
