const usermodel = require('../dbmodel/user')
const md5 = require('md5-node')
module.exports = function getuser(ctx){
  return new Promise((resolve,reject)=>{
    usermodel.find({
      username:ctx.request.body.user,
      userpwd:md5(ctx.request.body.password)
    },(err,res)=>{
  if(err){
    reject(err)
  }else{
    resolve(res)
  }
    })
  })
}