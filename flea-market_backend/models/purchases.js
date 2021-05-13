const mongoose = require('mongoose')

const { Schema, model } = mongoose

const purchaseSchema = new Schema(
  {
    __v: { type: Number, select: false }, // 版本
    title: { type: String, required: true }, // 标题
    brief: { type: String }, // 简介
    publisher: {
      // 发布人
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
    avatarUrl: { type: Array }, // 图片地址
    price: { type: String, require: true }, // 可接受价格
    buyerLabel: { type: Array, require: true }, // 买家标签
    weChatNumber: { type: String }, // 微信号码
    phoneNumber: { type: String }, // 手机号码
    qqNumber: { type: String }, // QQ号码
  },
  { timestamps: true }
)

module.exports = model('Purchase', purchaseSchema)
