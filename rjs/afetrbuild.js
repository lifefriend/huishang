/*
  1、清理临时文件夹_temp
 */
const fs=require("fs"); 
const path = require('path');
const utils = require('./utils.js');

let buildpath=path.dirname(__filename) + '/build.js';
let builddata=fs.readFileSync(buildpath,"utf-8");
let odata=eval(builddata);
let baseUrl=odata.baseUrl;

//删除临时文件夹
let tempPath=baseUrl+'/_temp';
let tempFolder=path.resolve(__dirname,tempPath);
utils.deleteDir(tempFolder);

