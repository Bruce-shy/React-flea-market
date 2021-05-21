module.exports = {
  secret: 'Bruce-shy', // jwt密钥
  connectionStr: 'mongodb://fleaAdmin:123456@212.64.39.76:27017/flea_market', // 远程数据库地址
  homePrefix: '/api', // 主页
  commentsPrefix: '/api/comments', // 评论
  goodsPrefix: '/api/goods', // 商品
  purchasesPrefix: '/api/purchases', // 求购
  usersPrefix: '/api/users', // 用户
  upLoadPrefix: '/api/upload', // 图片上传
}
