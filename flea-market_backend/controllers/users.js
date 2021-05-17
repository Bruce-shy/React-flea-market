const User = require('../models/users')
const Goods = require('../models/goods')
const Purchase = require('../models/purchases')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../utils/config')
class UserController {
  // verifyParams 校验请求体参数
  // 查找所有用户
  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const userList = await User.find()
      .limit(perPage)
      .skip(page * perPage)
    ctx.body = {
      code: 200,
      success: true,
      message: '加载成功',
      data: userList.filter((item) => item.account !== 'root'), // 不返回系统管理员
    }
  }

  // 根据 账号 查找用户信息
  async findByAccount(ctx) {
    const { fields } = ctx.query
    const selectFields =
      fields &&
      fields
        .split(';')
        .filter((f) => f)
        .map((f) => ' +' + f)
        .join('')
    // populate 填充查询 (连接查询)
    // findById 通过 _id 查询 findOne 通过关键字查询 且只返回一个
    const user = await User.findOne({ account: ctx.params.id })
      .select(selectFields)
      .populate('goods')
    if (!user) {
      ctx.body = {
        code: 404,
        success: false,
        message: '用户不存在',
      }
    } else {
      ctx.body = {
        code: 200,
        success: true,
        message: '查找成功',
        data: user,
      }
    }
  }

  // 用户注册
  async create(ctx) {
    ctx.verifyParams({
      account: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { account } = ctx.request.body
    const repeatedUser = await User.findOne({ account })
    if (repeatedUser) {
      ctx.body = {
        code: 409,
        success: false,
        message: '账号已存在',
      }
    } else {
      const user = await new User(ctx.request.body).save()
      ctx.body = {
        code: 200,
        success: true,
        message: '注册成功',
        data: user,
      }
    }
  }

  // 确保自己(或者管理员)才能修改信息
  async checkOwner(ctx, next) {
    if (
      ctx.params.id !== ctx.state.user._id &&
      ctx.state.user.account !== 'root'
    ) {
      ctx.body = {
        code: 403,
        success: false,
        message: '无权限',
      }
    } else {
      await next()
    }
  }

  // 更新用户信息
  async update(ctx) {
    ctx.verifyParams({
      account: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
    })
    // ctx.params.id === /:id
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
      new: true,
    }) // new: true 返回修改后的数据
    if (!user) {
      ctx.body = {
        code: 404,
        success: false,
        message: '用户不存在',
      }
    } else {
      ctx.body = {
        code: 200,
        success: true,
        message: '更新成功',
        data: user,
      }
    }
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.body = {
        code: 404,
        success: false,
        message: '用户不存在',
      }
    } else {
      ctx.body = {
        code: 200,
        success: true,
        message: '修改成功',
      }
    }
  }

  // 用户登录
  async login(ctx) {
    ctx.verifyParams({
      account: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.body = {
        code: 401,
        success: false,
        message: '用户名或密码不正确',
      }
    } else {
      const { _id, account } = user
      const token = jsonwebtoken.sign({ _id, account }, secret, {
        expiresIn: '1d', // 过期时间
      })
      ctx.body = {
        code: 200,
        success: true,
        message: '登录成功',
        data: {
          token,
        },
      }
    }
  }

  // 获取用户发布商品
  async listUserPublishGoods(ctx) {
    const goods = await Goods.find({ account: ctx.params.id }) // 返回所有匹配的项目 为数组
    if (!goods) {
      ctx.body = {
        code: 404,
        success: false,
        message: '用户未发布商品',
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

  // 获取用户发布求购
  async listUserPublishPurchase(ctx) {
    const purchase = await Purchase.find({ account: ctx.params.id })
    if (!purchase) {
      ctx.body = {
        code: 404,
        success: false,
        message: '用户未发布求购',
      }
    } else {
      ctx.body = {
        code: 200,
        success: true,
        message: '查找成功',
        data: purchase,
      }
    }
  }

  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id)
      .select('+following')
      .populate('following')
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user.following
  }

  async listFollowers(ctx) {
    const users = await User.find({ following: ctx.params.id })
    ctx.body = users
  }

  // 核对用户是否存在
  async checkUserExist(ctx, next) {
    const user = await User.findOne({ account: ctx.params.id })
    if (!user) {
      ctx.body = {
        code: 404,
        success: false,
        message: '用户不存在',
      }
    } else {
      await next()
    }
  }

  async listFollowingTopic(ctx) {
    const user = await User.findById(ctx.params.id)
      .select('+followingTopics')
      .populate('followingTopics')
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user.followingTopics
  }
  // async listQuestions(ctx) {
  //   const questions = await Question.find({ questioner: ctx.params.id });
  //   ctx.body = questions;
  // }
  // async likingAnswer(ctx, next) {
  //   const me = await User.findById(ctx.state.user._id).select('+likingAnswers');
  //   if (!me.likingAnswers.map(id => id.toString()).includes(ctx.params.id)) {
  //     me.likingAnswers.push(ctx.params.id);
  //     me.save();
  //     await Answer.findByIdAndUpdate(ctx.params.id, { $inc: { voteCount: 1 } });
  //   }
  //   ctx.status = 204;
  //   await next();
  // }
  // async unlikingAnswer(ctx) {
  //   const me = await User.findById(ctx.state.user._id).select('+likingAnswers');
  //   const index = me.likingAnswers
  //     .map(id => id.toString())
  //     .indexOf(ctx.params.id);
  //   if (index > -1) {
  //     me.likingAnswers.splice(index, 1);
  //     me.save();
  //     await Answer.findByIdAndUpdate(ctx.params.id, {
  //       $inc: { voteCount: -1 }
  //     });
  //   }
  //   ctx.status = 204;
  // }
  // async listLikingAnswers(ctx) {
  //   const user = await User.findById(ctx.params.id)
  //     .select('+likingAnswers')
  //     .populate('likingAnswers');
  //   if (!user) {
  //     ctx.throw(404, '用户不存在');
  //   }
  //   ctx.body = user.likingAnswers;
  // }
  // async disLikingAnswer(ctx, next) {
  //   const me = await User.findById(ctx.state.user._id).select(
  //     '+dislikingAnswers'
  //   );
  //   if (!me.dislikingAnswers.map(id => id.toString()).includes(ctx.params.id)) {
  //     me.dislikingAnswers.push(ctx.params.id);
  //     me.save();
  //   }
  //   ctx.status = 204;
  //   await next();
  // }
  // async unDisLikingAnswer(ctx) {
  //   const me = await User.findById(ctx.state.user._id).select(
  //     '+dislikingAnswers'
  //   );
  //   const index = me.dislikingAnswers
  //     .map(id => id.toString())
  //     .indexOf(ctx.params.id);
  //   if (index > -1) {
  //     me.dislikingAnswers.splice(index, 1);
  //     me.save();
  //   }
  //   ctx.status = 204;
  // }
  // async listDisLikingAnswers(ctx) {
  //   const user = await User.findById(ctx.params.id)
  //     .select('+dislikingAnswers')
  //     .populate('dislikingAnswers');
  //   if (!user) {
  //     ctx.throw(404, '用户不存在');
  //   }
  //   ctx.body = user.dislikingAnswers;
  // }

  // async collectingAnswer(ctx, next) {
  //   const me = await User.findById(ctx.state.user._id).select(
  //     '+collectingAnswers'
  //   );
  //   if (
  //     !me.collectingAnswers.map(id => id.toString()).includes(ctx.params.id)
  //   ) {
  //     me.collectingAnswers.push(ctx.params.id);
  //     me.save();
  //   }
  //   ctx.status = 204;
  //   await next();
  // }
  // async unCollectingAnswers(ctx) {
  //   const me = await User.findById(ctx.state.user._id).select(
  //     '+collectingAnswers'
  //   );
  //   const index = me.collectingAnswers
  //     .map(id => id.toString())
  //     .indexOf(ctx.params.id);
  //   if (index > -1) {
  //     me.collectingAnswers.splice(index, 1);
  //     me.save();
  //   }
  //   ctx.status = 204;
  // }
  // async listCollectingAnswer(ctx) {
  //   const user = await User.findById(ctx.params.id)
  //     .select('+collectingAnswers')
  //     .populate('collectingAnswers');
  //   if (!user) {
  //     ctx.throw(404, '用户不存在');
  //   }
  //   ctx.body = user.collectingAnswers;
  // }
}

module.exports = new UserController()
