const mongoose = require('mongoose')

const { Schema, model } = mongoose

// select: 布尔值 指定 query 的默认, 指是否能被查询到
const userSchema = new Schema(
  {
    __v: { type: Number, select: false }, // 版本
    account: { type: String, required: true }, // 账号
    password: { type: String, required: true, select: false }, // 真实姓名
    avatarUrl: { type: String }, // 头像地址
    nickName: { type: String, required: true }, // 昵称
    college: { type: String, required: true }, // 学院
    releaseInformations: {
      type: [
        {
          goods: { type: Schema.Types.ObjectId, ref: 'Goods' },
          buy: { type: Schema.Types.ObjectId, ref: 'Purchase' },
        },
      ],
    },
    goods: {
      // 发布的商品
      type: Schema.Types.ObjectId,
      ref: 'Goods',
      select: false,
    },
    weChatNumber: { type: String }, // 微信号码
    phoneNumber: { type: String }, // 手机号码
    qqNumber: { type: String }, // QQ号码
  },
  { timestamps: true }
)

module.exports = model('User', userSchema)
