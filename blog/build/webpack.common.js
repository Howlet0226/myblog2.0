const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlwebpackplugin = require('html-webpack-plugin')
module.exports = {
  entry:path.resolve(__dirname,'../src/main.js'),
  output:{
    filename:'main.js',
    path: path.resolve(__dirname,'../dist'),
    chunkFilename:'[name].[contenthash:8].js'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:'babel-loader'
      },
      {
        test:/\.vue$/,
        use:'vue-loader'
      },
      {
        test:/\.(jpg|png|gif)$/,
        use:{
          loader:'url-loader',
          options:{
            limit:8*1024,
            outputPath:path.resolve(__dirname,'../dist/images')
          }
        }
      },
      {
        test:/\.(woff|woff2?|svg|eot|ttf)$/,
        use:{
          loader:'url-loader',
          options:{
            limit: 8*1024,
            publicPath:'../../',
          }
        }
      },
      {
        test:/\.less$/,
        use:['vue-style-loader','css-loader','less-loader']
      }
    ]
  },
  optimization:{
    splitChunks:{
      chunks:'async',
      cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
        }
    }
  }
},
  plugins:[
    new VueLoaderPlugin(),
    new htmlwebpackplugin({
      template:path.resolve(__dirname,'../index.html')
    })
  ]
}