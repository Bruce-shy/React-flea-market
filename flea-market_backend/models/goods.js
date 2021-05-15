const mongoose = require('mongoose')

const { Schema, model } = mongoose

const goodsSchema = new Schema(
  {
    __v: { type: Number, select: false }, // 版本
    title: { type: String, required: true }, // 标题
    brief: { type: String, required: true }, // 简介
    publisher: {
      // 发布人
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
    imageUrl: { type: Array }, // 图片地址
    category: { type: Array, require: true }, // 分类
    price: { type: String, require: true }, // 标价
    originPrice: { type: String, require: true }, // 原价
    sellerLabel: { type: Array, require: true }, // 卖家标签
    postage: { type: String, require: true }, // 邮费
    weChatNumber: { type: String }, // 微信号码
    phoneNumber: { type: String }, // 手机号码
    qqNumber: { type: String }, // QQ号码
    views: { type: Number, default: 0 }, // 浏览量
  },
  { timestamps: true }
)

module.exports = model('Goods', goodsSchema)
