const router = require('koa-router')()

module.exports = (app) => {
  router.get( '/', app.controller.home.index )
  
  router.get('/home', app.controller.home.home)
  
  router.get('/home/:id/:name', app.controller.home.homeParams)
  router.get('/user', app.controller.home.login)
  router.post('/user/register', app.controller.home.register)
  router.post('/statistic/join', app.controller.statistic.join)
  router.post('/statistic/click', app.controller.statistic.click)
  router.post('/statistic/share', app.controller.statistic.share)
  router.post('/statistic/activityCount', app.controller.statistic.activityCount)


  app.use(router.routes())
    .use(router.allowedMethods())
}