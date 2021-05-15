const Comment = require('../models/comments')

class CommentController {
  // 查找
  async find(ctx) {
    const { per_page = 10 } = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    const { goodsId } = ctx.params
    const { rootCommentId } = ctx.query
    ctx.body = await Comment.find({
      content: q,
      goodsId,
      rootCommentId,
    })
      .limit(perPage)
      .skip(page * perPage)
      .populate('commentator replyTo')
  }

  // 根据商品id查找评论
  async findByGoodsId(ctx) {
    const { fields } = ctx.query
    const selectFields =
      fields &&
      fields
        .split(';')
        .filter((f) => f)
        .map((f) => ' +' + f)
        .join('')
    const comment = await Comment.findOne({ goodsId: ctx.params.id })
      .select(selectFields)
      // .populate('commentator')
      console.log('dsadfafas');
    if (!comment) {
      ctx.body = {
        code: 404,
        success: false,
        message: '评论不存在',
      }
    } else {
      ctx.body = {
        code: 200,
        success: true,
        message: '加载成功',
        data: comment,
      }
    }
  }

  // 创建评论
  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true },
    })
    const commentator = ctx.state.user._id // 只能在登录了以后拿？评论人
    const { goodsId } = ctx.params
    const comment = await new Comment({
      ...ctx.request.body,
      commentator,
      goodsId,
    }).save()
    ctx.body = comment
  }

  // 核对评论
  async checkCommentator(ctx, next) {
    const { comment } = ctx.state
    if (comment.commentator.toString() !== ctx.state.user._id) {
      ctx.throw(403, '无权限')
    }
    await next()
  }

  // 修改评论
  async update(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: false },
    })
    const { content } = ctx.request.body
    // 只有归属于一级评论的两级评论才能修改
    await ctx.state.comment.update({ content })
    ctx.body = ctx.state.comment
  }

  // 删除评论
  async delete(ctx) {
    const comment = await Comment.findByIdAndRemove(ctx.params.id)
    if (!comment) {
      ctx.throw(404, '问题不存在')
    }
    ctx.status = 204
  }
  async checkCommentExist(ctx, next) {
    const comment = await Comment.findById(ctx.params.id).select('+commentator')
    if (!comment) {
      ctx.throw(404, '评论不存在')
    }
    if (
      ctx.params.questionId &&
      comment.questionId.toString() !== ctx.params.questionId
    ) {
      ctx.throw(404, '该问题下没有此评论')
    }
    if (
      ctx.params.answerId &&
      comment.answerId.toString() !== ctx.params.answerId
    ) {
      ctx.throw(404, '该答案下没有此评论')
    }
    ctx.state.comment = comment
    await next()
  }
}

module.exports = new CommentController()
