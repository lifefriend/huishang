/*
  1、检查打包的目的文件夹是否存在
  2、清空目的文件夹
 */
const fs=require("fs"); 
const path = require('path');
const utils = require('./utils.js');

let configfilename=path.dirname(__filename) + '/config.js';
let writedata=fs.readFileSync(configfilename,"utf-8"); 
writedata=eval(writedata);
let bulitdir=writedata.dir;
bulitdir=path.resolve(__dirname,bulitdir);
utils.emptyFolder(bulitdir);