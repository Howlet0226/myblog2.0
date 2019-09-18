const   mongooes = require('../bd/mongodb')
const md5 = require('md5-node')
let Schema = mongooes.Schema
var newSchema = new Schema({
  username : { type: String },                    
  userpwd: {type: String}   
})
  //注册管理员
// let model = mongooes.model('user',newSchema,'user')
//   var user = new model({
//     username:'howlet',
//     userpwd:md5('xxxxx')
//   })
//   user.save()
module.exports = mongooes.model('user',newSchema,'user')