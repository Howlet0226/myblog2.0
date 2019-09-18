const moogose = require('../bd/mongodb')
const blogmodel = require('../dbmodel/blog')
module.exports = function fixblog(ctx){
  const id = moogose.Types.ObjectId(ctx.request.body.id)
  const updateStr = {
    content:ctx.request.body.content,
    title: ctx.request.body.title,
    text: ctx.request.body.text,
    createtime:new Date()
  }
  const idstr = {
    _id:id
  }
  return new Promise((resolve,reject)=>{
    blogmodel.updateOne(idstr,updateStr,function(err,res){
      if(err){
        reject(err);
      }else{
        resolve(res);
      }
    })
  })
}