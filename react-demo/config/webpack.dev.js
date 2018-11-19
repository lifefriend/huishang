const glob = require('glob');
const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require("purifycss-webpack");

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.jsx'
  },
  output: {
    path: path.resolve(__dirname,'../dist'),
    filename: 'js/[name].js'
    // publicPath: "http://localhost:8080/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader:"css-loader"
            },
            {
              loader:"postcss-loader",
            }
          ]
        }),
      },
      { 
        test:/\.(png|jpg|gif|jpeg)/, 
        use:[
          { 
            loader:'url-loader',
            options:{ 
              limit:500,
              outputPath:'images/'
            } 
          }
        ] 
      },
      // html 中引入图片的问题
      {
        test: /\.(htm|html)$/i,
        use:[ 'html-withimg-loader'] 
      },
      //scss loader
      { 
        test: /\.scss$/, 
        use: ExtractTextPlugin.extract({
          use: [
            {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        }) 
      },
      //babel 配置
      {
        test:/\.(jsx|js)$/,
        use:{
          loader:'babel-loader'     
        },
        exclude:/node_modules/
      }
    ]
  },
  plugins: [
    new uglify(),
    new HtmlWebpackPlugin({ 
      minify:{        
        removeAttributeQuotes:true 
      }, 
      hash:true,  
      template:'./src/index.html'
    }),
    new ExtractTextPlugin("css/index.css"),
    new PurifyCSSPlugin({ 
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname,'../dist'),
    host: 'localhost',
    compress: true,
    port: 8080
  }
}