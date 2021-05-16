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
  listFollowing,
  listFollowers,
  checkUserExist,
  follow,
  unfollow,
  followTopic,
  unfollowTopic,
  listFollowingTopic,
  listUserPublishGoods,
  listUserPublishPurchase,
  // listQuestions,
  // likingAnswer,
  // unlikingAnswer,
  // listLikingAnswers,
  // disLikingAnswer,
  // unDisLikingAnswer,
  // listDisLikingAnswers,
  // listCollectingAnswer,
  // collectingAnswer,
  // unCollectingAnswers
} = require('../controllers/users')
// const { checkTopicExist } = require('../controllers/topics');

// const { checkAnswerExist } = require('../controllers/answers');

const auth = jwt({ secret })

router.get('/', find)

// router.post('/', auth, create);
router.post('/', create)

router.get('/:id', findByAccount)

router.patch('/:id', auth, checkOwner, update) // 确保自己只能改自己的信息 patch 更新资源部分内容

router.delete('/:id', auth, checkOwner, del)

router.post('/login', login)

router.get('/:id/following', listFollowing)

router.get('/:id/publishGoods', checkUserExist, listUserPublishGoods) // 获取用户发布的商品

router.get('/:id/publishPurchase', checkUserExist, listUserPublishPurchase) // 获取用户发布的求购

router.get('/:id/followers', listFollowers)

router.put('/following/:id', auth, checkUserExist, follow)

router.delete('/following/:id', auth, checkUserExist, unfollow)

// router.put('/followingTopic/:id', auth, checkTopicExist, followTopic);

// router.delete('/followingTopic/:id', auth, checkTopicExist, unfollowTopic);

router.get('/:id/followingTopic', listFollowingTopic)

// router.get('/:id/questions', listQuestions);

// router.get('/:id/likingAnswers', listLikingAnswers);

// router.put(
//   '/likingAnswers/:id',
//   auth,
//   checkAnswerExist,
//   likingAnswer,
//   unDisLikingAnswer
// );

// router.delete('/likingAnswers/:id', auth, checkAnswerExist, unlikingAnswer);

// router.get('/:id/dislikingAnswers', listDisLikingAnswers);

// router.put(
//   '/dislikingAnswers/:id',
//   auth,
//   checkAnswerExist,
//   disLikingAnswer,
//   unlikingAnswer
// );

// router.delete(
//   '/dislikingAnswers/:id',
//   auth,
//   checkAnswerExist,
//   unDisLikingAnswer
// );

// router.get('/:id/collectingAnswers', listCollectingAnswer);

// router.put('/collectingAnswers/:id', auth, checkAnswerExist, collectingAnswer);

// router.delete(
//   '/collectingAnswers/:id',
//   auth,
//   checkAnswerExist,
//   unCollectingAnswers
// );

module.exports = router
