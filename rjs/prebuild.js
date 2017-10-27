"use strict"
let writefilename,configfilename,writedata,baseUrl,configpaths;
const rf=require("fs"); 
const path = require('path');
writefilename=path.dirname(__filename) + '/build.js'; 
configfilename=path.dirname(__filename) + '/config.js';
writedata=rf.readFileSync(configfilename,"utf-8"); 
writedata=eval(writedata);
baseUrl=writedata.baseUrl;
configpaths=writedata.modules;
if(!configpaths || configpaths.length<1)throw new Error("no modules");
writedata.packages=[];
writedata.paths={};
writedata.shim={};
configpaths.map(val=>readConfig(val));
rf.writeFileSync(writefilename,"("+JSON.stringify(writedata)+")");

function readConfig(configpath){
    let temppath="";
    let excludeTag=false;
    if(configpath.location)
        temppath=configpath.location+'/'+configpath.main+'.js';
    else{
        temppath=configpath.name+'.js';
        configpath.exclude=[];
        excludeTag=true;
    }   
    let tempconfigpath=baseUrl+'/'+temppath;
    let tempfilepath=path.resolve(__dirname,tempconfigpath);
    let data=rf.readFileSync(tempfilepath,"utf-8"); 
    let q=data.split('require.config({');
    if(q.length<1) return;
    let w=q[1].split('})');
    let e=eval('({'+w[0]+'})');
    if(e.packages){
        writedata.packages=e.packages;
        e.packages.map(val=>readConfig(val));
    }
    if(e.paths){
        writedata.paths=Object.assign(writedata.paths,e.paths);
        let keys = Object.keys(e.paths);
        excludeTag && keys.map(val=>configpath.exclude.push(val));
    }
    e.shim && (writedata.shim=Object.assign(writedata.shim,e.shim));
}
 