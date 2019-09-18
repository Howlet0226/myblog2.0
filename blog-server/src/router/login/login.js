const login = require('koa-router')()
const logincheck = require('../../methods/logincheck')
const { set:redisset } = require('../../bd/redis')
const getuser = require('../../methods/getuser')
login.post('/login', async (ctx, next) => {
    let user = await getuser(ctx)
    // console.log(user);
  if (user.length > 0) {
    var userId = `${Date.now()}_${Math.random()}`
     await redisset(userId,{
      user:ctx.request.body.user,
      password:ctx.request.body.password
    })
      ctx.session['sessionid'] = userId
      ctx.body = {
        errcode:0,
        message:'登录成功'
      }
  } else {
    ctx.body = {
      ercode:1,
      message:'登录失败'
    }
  }
})

module.exports = login