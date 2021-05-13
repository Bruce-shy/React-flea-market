// 用于上传图片
const path = require('path')

class HomeController {
  upload(ctx) {
    const file = ctx.request.files.file // 获取上传文件 .file 是根据前端传来的 参数名
    const basename = path.basename(file.path) // 提取出用 ‘/' 隔开的 path 的最后一部分 (获取文件名)
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` }
  }
}

module.exports = new HomeController()
