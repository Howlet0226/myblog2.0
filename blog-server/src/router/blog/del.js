const router = require('koa-router')()
const delblogfun = require('../../methods/delblog')
const logincheck = require('../../methods/logincheck')

router.get('/',async(ctx,next)=>{
  let islogin = await logincheck(ctx.session['sessionid'])
  if(!islogin){
    ctx.body = {
      errcode:1,
      message:'未登录'
    }
    return
  }
  console.log(ctx.query.id);
  if(ctx.query.id){
    let result = await delblogfun(ctx.query.id)
    ctx.body = {
      errcode :0,
      result
    }
  }else{
    ctx.body = {
      errcode:1
    }
  }
})
module.exports = router