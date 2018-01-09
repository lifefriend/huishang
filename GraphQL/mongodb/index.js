// 引入mongoose模块
import mongoose from 'mongoose'
import config from '../config'

// 同步引入 info model和 studen model
require('./schema/info')
require('./schema/student')
require('./schema/course')

// Use bluebird
mongoose.Promise = require('bluebird');

// 链接mongodb
export const database = () => {

  //是否显示"NOSQL"语句
  mongoose.set('debug', true)

  mongoose.connect(config.dbPath,{useMongoClient:true})

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.dbPath)
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB ', config.dbPath)
  })
}