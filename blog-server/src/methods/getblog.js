const blogmodel = require('../dbmodel/blog')
const mongoose = require('../bd/mongodb')
function getblog(id){
return new Promise((resolve,reject)=>{
  if(id){
   var _id = mongoose.Types.ObjectId(id)
    blogmodel.find({
      _id
    },(err,res)=>{
      if(err){
        reject(err)
      }else{
        resolve(res)
      }
    })
  }else{
    blogmodel.find({},['_id','title','text','createtime','author'],(err,res)=>{
      if(err){
        reject(err)
      }else{
        resolve(res)
      }
    }).sort({'createtime':-1})
  }
})
}
module.exports = getblog