const mongooes = require('../bd/mongodb')
const Schema = mongooes.Schema
const countschema = new Schema({
  id: { type: Number },
  view: { type: Number },
  love: { type: Number }
})

let countmodel = mongooes.model('count', countschema, 'count')
module.exports = countmodel