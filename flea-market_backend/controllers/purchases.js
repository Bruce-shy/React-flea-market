const Purchase = require('../models/purchases')
const User = require('../models/users')
// const Question = require('../models/goods')
class PurchaseController {
  // 查找全部
  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    // populate 关联查询 数据填充 填充 User 表中的内容
    const purchaseList = await Purchase.find()
      .populate('publisher')
      .limit(perPage)
      .skip(page * perPage)
    ctx.body = {
      code: 200,
      success: true,
      message: '加载成功',
      data: purchaseList,
    }
  }

  // 根据 id 查询
  async findById(ctx) {
    const { fields } = ctx.query
    const selectFields =
      fields &&
      fields
        .split(';')
        .filter((f) => f)
        .map((f) => ' +' + f)
        .join('')
    const topic = await Topic.findById(ctx.params.id).select(selectFields)
    ctx.body = topic
  }

  // 创建求购信息
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      account: { type: 'string', required: true },
      price: { type: 'string', required: true },
      buyerLabel: { type: 'array', required: false },
    })
    const publisher = ctx.state.user._id
    const purchase = await new Purchase({
      ...ctx.request.body,
      publisher,
    }).save()
    ctx.body = {
      code: 200,
      success: true,
      message: '发布成功',
      data: purchase,
    }
  }

  // 核对发布者信息
  async checkPublisher(ctx, next) {
    const { purchase } = ctx.state
    // purchase.publisher._id 取得的是 Number 型数据
    if (purchase.publisher._id.toString() != ctx.state.user._id) {
      // 发布人 id 和当前登录人 ID 一样时才能进入下一步
      ctx.body = {
        code: 403,
        success: false,
        message: '无权限',
      }
    } else {
      await next()
    }
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    })
    const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = topic
  }

  // 删除求购信息
  async delete(ctx) {
    const purchase = await Purchase.findByIdAndRemove(ctx.params.id)
    if (!purchase) {
      ctx.body = {
        code: 404,
        success: false,
        message: '求购信息不存在',
      }
    } else {
      ctx.body = {
        code: 204,
        success: true,
        message: '删除成功',
      }
    }
  }

  // 核对求购信息是否存在
  async checkPurchaseExist(ctx, next) {
    const purchase = await await Purchase.findById(ctx.params.id).populate(
      'publisher'
    )
    if (!purchase) {
      ctx.body = {
        code: 404,
        success: false,
        message: '未找到对应求购信息',
      }
    } else {
      ctx.state.purchase = purchase
      await next()
    }
  }

  async listTopicFollowers(ctx) {
    const users = await User.find({ followingTopics: ctx.params.id })
    ctx.body = users
  }

  async checkTopicExist(ctx, next) {
    const topic = await Topic.findById(ctx.params.id)
    if (!topic) {
      ctx.throw(404, '话题不存在')
    }
    await next()
  }

  async listQuestions(ctx) {
    const questions = await Question.find({ topics: ctx.params.id })
    ctx.body = questions
  }
}

module.exports = new PurchaseController()
