const Goods = require('../models/goods')

class GoodsController {
  // 查找全部
  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const goodsList = await Goods.find().populate('publisher')
    .limit(perPage)
    .skip(page * perPage)
    ctx.body = {
      code: 200,
      success: true,
      message: '加载成功',
      data: goodsList,
    }
  }

  // 根据 category 查找商品
  async findByCategory(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const { category } = ctx.query
    const arr = category.split(',')
    const goodsList = await Goods.find({ category: arr }).populate(
      'publisher'
    )
    .limit(perPage)
    .skip(page * perPage)
    ctx.body = {
      code: 200,
      success: true,
      message: '加载成功',
      data: goodsList,
    }
  }

  // 根据 id 查找 商品
  async findById(ctx) {
    const { fields } = ctx.query
    const selectFields =
      fields &&
      fields
        .split(';')
        .filter((f) => f)
        .map((f) => ' +' + f)
        .join('')
    const goods = await Goods.findById(ctx.params.id)
      .select(selectFields)
      .populate('publisher')
    if (!goods) {
      ctx.body = {
        code: 404,
        success: false,
        message: '查找失败',
      }
    } else {
      ctx.body = {
        code: 200,
        success: true,
        message: '查找成功',
        data: goods,
      }
    }
  }

  // 创建商品信息
  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      brief: { type: 'string', required: true },
      account: { type: 'string', required: true },
      category: { type: 'array', required: true },
      price: { type: 'string', required: true },
      originPrice: { type: 'string', required: true },
      sellerLabel: { type: 'array', required: true },
      postage: { type: 'string', required: true },
    })
    const publisher = ctx.state.user._id
    const goods = await new Goods({
      ...ctx.request.body,
      publisher,
    }).save()
    ctx.body = {
      code: 200,
      success: true,
      message: '发布成功',
      data: goods,
    }
  }

  // 核对发布者信息
  async checkPublisher(ctx, next) {
    const { goods } = ctx.state
    if (goods.publisher._id.toString() !== ctx.state.user._id && ctx.state.user.account !== 'root') {
      // 发布人 id 和当前登录人 ID 一样时(或者为管理员)才能进入下一步
      ctx.body = {
        code: 403,
        success: false,
        message: '无权限',
      }
    } else {
      await next()
    }
  }

  // 更新商品信息
  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      brief: { type: 'string', required: true },
      category: { type: 'array', required: true },
      price: { type: 'string', required: true },
      originPrice: { type: 'string', required: true },
      sellerLabel: { type: 'array', required: true },
      postage: { type: 'string', required: true },
    })
    const newGoods = await Goods.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      {
        new: true,
      }
    )
    ctx.body = {
      success: true,
      message: '更新成功',
      data: newGoods,
    }
  }

  // 更新商品浏览量 每次浏览量 +1 (只有登录了才计算浏览量 防止刷浏览量)
  async updateViews(ctx) {
    const newGoods = await Goods.findByIdAndUpdate(
      ctx.params.id,
      { views: ctx.state.goods.views + 1 },
      {
        new: true,
      }
    ) // new: true 返回修改后的数据
    ctx.body = {
      success: true,
      message: '更新成功',
      data: newGoods,
    }
  }

  // 删除商品信息
  async delete(ctx) {
    const goods = await Goods.findByIdAndRemove(ctx.params.id)
    if (!goods) {
      ctx.body = {
        code: 404,
        success: false,
        message: '商品不存在',
      }
    } else {
      ctx.body = {
        code: 204,
        success: true,
        message: '删除成功',
      }
    }
  }

  // 核对商品是否存在
  async checkGoodsExist(ctx, next) {
    const goods = await await Goods.findById(ctx.params.id).populate(
      'publisher'
    )
    if (!goods) {
      ctx.body = {
        code: 404,
        success: false,
        message: '未找到对应商品',
      }
    } else {
      ctx.state.goods = goods
      await next()
    }
  }
}

module.exports = new GoodsController()
