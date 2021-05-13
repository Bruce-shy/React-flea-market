const jwt = require('koa-jwt')
const { purchasesPrefix, secret } = require('../utils/config')
const Router = require('koa-router')
const router = new Router({ prefix: purchasesPrefix })
const {
  find,
  findById,
  create,
  update,
  listTopicFollowers,
  checkTopicExist,
  listQuestions,
} = require('../controllers/purchases')

const auth = jwt({ secret })

router.get('/', find)

router.post('/', auth, create)

router.get('/:id', checkTopicExist, findById)

router.patch('/:id', auth, checkTopicExist, update)

router.get('/:id/followers', checkTopicExist, listTopicFollowers)

router.get('/:id/questions', checkTopicExist, listQuestions)

module.exports = router
