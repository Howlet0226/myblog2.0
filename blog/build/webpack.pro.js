const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const path = require('path')
const proConf = {
  mode:'production'
}

module.exports = merge(commonConfig,proConf)