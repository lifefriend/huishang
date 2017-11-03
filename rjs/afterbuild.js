/*
  1、清理临时文件夹_temp
 */
const fs=require("fs"); 
const path = require('path');
const file = require('./file.js');

let buildpath=path.dirname(__filename) + '/build.js';
let builddata=fs.readFileSync(buildpath,"utf-8");
let odata=eval(builddata);
let baseUrl=odata.baseUrl;
let dir=odata.dir;

//删除临时文件夹
let tempPath=baseUrl+'/_temp';
let tempFolder=path.resolve(__dirname,tempPath);
file.deleteDir(tempFolder);

//删除.svn文件夹
let hideDir=path.resolve(__dirname,dir);
file.deleteHideDir(hideDir);

//删除build.txt
let filepath=path.resolve(__dirname,dir+'/build.txt');
file.deleteFile(filepath);
