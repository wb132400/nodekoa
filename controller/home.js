

const query = require('../databases/mysql')
module.exports = {
  index: async function (ctx, next) {
    // await ctx.render("home/index", {title: "iKcamp欢迎您"})
    // await ctx.render('img/01.jpg')
    ctx.body='22'
  },
  home: async (ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    let rows = await query('select * from employee_tbl')
    ctx.body = rows
  },
  homeParams: async (ctx, next) => {
    console.log(ctx.params)
    ctx.response.body = '<h1>HOME page /:' + ctx.params.id + '/:' + ctx.params.name + '</h1>'
  },
  login: async (ctx, next) => {
    await ctx.render('home/login', {
      btnName: 'GoGoGo'
    })
  },
  register: async function (ctx, next) {
    const { app } = ctx
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    let res = await app.service.home.register(name, password)
    if (res.status == "-1") {
      await ctx.render("home/login", res.data)
    } else {
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  }
}