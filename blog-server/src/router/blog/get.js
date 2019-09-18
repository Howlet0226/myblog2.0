const router = require('koa-router')()
const getblogfun = require('../../methods/getblog')
const logincheck = require('../../methods/logincheck')
router.get('/',async (ctx,next)=>{
   let result 
   if(ctx.query.manage){
    result = await logincheck(ctx.session['sessionid'])
   //  console.log(result);
    if(result){
      await next()
    }else{
       ctx.body = {
          ercode:1,
          message:'未登录'
       }
    }
   }else{
     await next()
   }
})
router.get('/',async(ctx,next)=>{
  if(ctx.query.id){
     result = await  getblogfun(ctx.query.id)
  }else{
     result = await  getblogfun()
  }
  // console.log(result);
  ctx.body = result
})
module.exports = router