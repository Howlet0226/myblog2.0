const mongooes = require('../bd/mongodb')
const Schema = mongooes.Schema
const blogSchema = new Schema({
  title:{type:String},
  text:{type:String},
  content:{type:String},
  createtime:{type:Number},
  author:{type:String}
})
module.exports = mongooes.model('blog',blogSchema,'blog')