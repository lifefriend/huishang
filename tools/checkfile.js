/*
  1、检查js文件是否存在
  2、处理js文件重复引用（拷贝一份到_temp目录下,更改路径）
 */
const fs=require("fs"); 
const path = require('path');
const utils = require('./utils.js');

const extname='.js';
let buildpath=path.dirname(__filename) + '/build.js';
let builddata=fs.readFileSync(buildpath,"utf-8");
let odata=eval(builddata);
let baseUrl=odata.baseUrl;
let paths=odata.paths;

//创建临时文件夹
let tempPath=baseUrl+'/_temp';
let tempFolder=path.resolve(__dirname,tempPath);
utils.emptyFolder(tempFolder);

//存储不存在文件引用
let missFileKey=[];
let filePathObj={};
let keys = Object.keys(paths);
for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    let tempconfigpath=baseUrl+'/'+ paths[key]+extname;
    let tempfilepath=path.resolve(__dirname,tempconfigpath); 
    let isexist=fs.existsSync(tempfilepath);
    if(!isexist) {
        missFileKey.push(key);
        delete(paths[key]);
    }else{
        if(filePathObj[paths[key]]){
            //重复引用了，执行拷贝
            let oldPath=tempfilepath;
            let saveName =(new Date()).getTime() + parseInt(Math.random()*10000);
            let savePath = tempPath+'/'+saveName;
            let newPath=path.resolve(__dirname,savePath +extname);
            let writedata=fs.readFileSync(oldPath,"utf-8"); 
            fs.writeFileSync(newPath,writedata);
            paths[key]='_temp/'+saveName;
        }else{
            filePathObj[paths[key]]=key;
        }  
    }
}
//删除不存在文件的关联引用
let shims=odata.shim;
let omodules=odata.modules;
for(let i=0;i < missFileKey.length;i++){
    let key =missFileKey[i];
    if(shims[key])
        delete(shims[key]);
    for(let j=0;j < omodules.length;j++){
        let exclude=omodules[j].exclude;
        omodules[j].exclude=delete4Arr(key,exclude);
    }         
}
fs.writeFileSync(buildpath,"("+JSON.stringify(odata)+")");
function delete4Arr(key,arr){
    let tempArr=[];
    for(let i=0;i < arr.length;i++){
        if(key===arr[i]) continue;
        tempArr.push(arr[i]);
    }
    return tempArr;
}

