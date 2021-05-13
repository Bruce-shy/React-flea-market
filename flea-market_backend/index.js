const Koa = require('koa')
const path = require('path')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')
const error = require('koa-json-error')
const koa2Cors = require('koa2-cors') // 服务器端处理跨域
const mongoose = require('mongoose')
const routing = require('./routes')
const app = new Koa()
const { connectionStr } = require('./utils/config')

mongoose.connect(
  connectionStr,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('成功连接 mongodb! ')
)
mongoose.connection.on('error', console.error)

// 静态文件
app.use(koaStatic(path.join(__dirname, 'public')))

app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest },
  })
)

app.use(
  koaBody({
    // 启用文件传输
    multipart: true,
    formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, '/public/uploads'),
      // 保留拓展名
      keepExtensions: true,
    },
  })
)

app.use(parameter(app))

app.use(koa2Cors()) // 后端使用 koa2-cors 处理跨域问题
routing(app)

app.listen(3030, () => console.log('程序启动在3030端口了'))
