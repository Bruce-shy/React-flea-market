const jwt = require('koa-jwt')
const { commentsPrefix, secret } = require('../utils/config')
const Router = require('koa-router')
const router = new Router({
  // prefix: '/questions/:questionId/answers/:answerId/comments'
  prefix: commentsPrefix,
})
const {
  create,
  update,
  delete: del,
  checkCommentExist,
  checkCommentator,
} = require('../controllers/comments')
// const { checkAnswerExist } = require('../controllers/answers');

const auth = jwt({ secret })

router.post('/', auth, create) // 需要登录了才能创建 从而取得 ctx.state.user._id 的值

router.patch('/:id', auth, checkCommentExist, checkCommentator, update)

router.delete('/:id', auth, checkCommentExist, checkCommentator, del)

module.exports = router
