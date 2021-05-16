const mongoose = require('mongoose')

const { Schema, model } = mongoose

const commentSchema = new Schema(
  {
    __v: { type: Number, select: false },
    rate: { type: Number}, // 评分
    content: { type: String, required: true }, // 内容
    commentator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    }, // 评论人
    goodsId: { type: String, required: true }, // 商品 Id
  },
  { timestamps: true }
)

module.exports = model('Comment', commentSchema)
