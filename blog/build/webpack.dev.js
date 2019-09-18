const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const path = require('path')

const devConfig = {
  mode:'development',
  devtool:'cheap-module=eval-source-map',
  devServer:{
    contentBase:path.resolve(__dirname,'../dist'),
    open:true,
    port:8081,
    hot:true,
    hotOnly:true,
    proxy:{
      '/api': {
        target: 'http://localhost:8000'
    }
    }
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig,devConfig)