
const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const miSend = require('./mi-send')
const miLog = require('./mi-log')
const ip = require('ip')
const cors = require('koa-cors')
// 引入请求错误中间件
const miHttpError = require('./mi-http-error')
const miRule = require('./mi-rule')

module.exports = (app) => {
    /**
   * 在接口的开头调用
   * 指定 controller 文件夹下的 js 文件，挂载在 app.controller 属性
   * 指定 service 文件夹下的 js 文件，挂载在 app.service 属性
   */ 
    miRule({
        app,
        rules: [
          {
            folder: path.join(__dirname, '../controller'),
            name: 'controller'
          },
          {
            folder: path.join(__dirname, '../service'),
            name: 'service'
          }
        ]
      })
    app.use(miHttpError())
    app.use(cors())
    app.use(miLog({
        nv: app.env,  // koa 提供的环境变量
        projectName: 'koa2-study',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: ip.address()
    }))
    // 指定 public目录为静态资源目录，用来存放 js css images 
    app.use(staticFiles(path.resolve(__dirname, "../public")))

    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '../views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    }));

    app.use(bodyParser())
    app.use(miSend())
    app.on("error", (err, ctx) => {
        if (ctx && !ctx.headerSent && ctx.status < 500) {
            ctx.status = 500
        }
        if (ctx && ctx.log && ctx.log.error) {
            if (!ctx.state.logged) {
                console.log('err') 
                ctx.log.error(err.stack)
              
            }
        }
    })
}