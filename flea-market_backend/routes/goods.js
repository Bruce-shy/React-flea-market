const jwt = require('koa-jwt')
const { goodsPrefix,secret } = require('../utils/config')
const Router = require('koa-router')
const router = new Router({ prefix: goodsPrefix })
const {
  find,
  findById,
  create,
  update,
  delete: del,
  checkQuestionExist,
  checkQuestioner,
} = require('../controllers/goods')

const auth = jwt({ secret })

router.get('/', find)

router.post('/', auth, create)

router.get('/:id', checkQuestionExist, findById)

router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update)

router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del)

module.exports = router
