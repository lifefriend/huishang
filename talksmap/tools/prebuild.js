"use strict"
let writefilename,configfilename,writedata,baseUrl,configpaths;
const rf=require("fs"); 
const path = require('path');
writefilename=path.dirname(__filename) + '/build.js'; 
configfilename=path.dirname(__filename) + '/config.js';
writedata=rf.readFileSync(configfilename,"utf-8"); 
writedata=eval(writedata);
const writeBaseUrl=writedata.baseUrl;
let configBaseUrl="";
baseUrl = writeBaseUrl;
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
    let tempconfigpath= null ;
    if(configpath.location){
        temppath=configpath.location+'/'+configpath.main+'.js';
        tempconfigpath=writeBaseUrl + '/' + temppath; 
    }       
    else{
        temppath=configpath.name+'.js';
        configpath.exclude=[];
        excludeTag=true;
        tempconfigpath=baseUrl+'/'+temppath;
    }   
    let tempfilepath=path.resolve(__dirname,tempconfigpath);
    let data=rf.readFileSync(tempfilepath,"utf-8"); 
    let commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
    data=data.replace(commentRegExp,"");

    
    if(data.indexOf('require.config')<0) return;
    let q=data.split(/(require.config)([\s]+|[\s]?)(\()([\s]+|[\s]?)(\{)/i);
    if(q.length<1) return;
    let w=q[q.length-1].split(/(\})([\s]+|[\s]?)(\))/i);

    let e=eval('({'+w[0]+'})');
    if(e.baseUrl){
        configBaseUrl = e.baseUrl;
        baseUrl = writeBaseUrl + '/' + e.baseUrl;
    }      
    if(e.packages){       
        e.packages.map(val=>{
            val.location =configBaseUrl + val.location;
            readConfig(val);
        });
        writedata.packages=e.packages;
    }
    if(e.paths){
        //TODO：
        //writedata.paths=Object.assign(writedata.paths,e.paths);
        let keys = Object.keys(e.paths);
        keys.map(val=>{
            excludeTag && configpath.exclude.push(val);
            writedata.paths[val]=configBaseUrl + e.paths[val];
        });
    }
    e.shim && (writedata.shim=Object.assign(writedata.shim,e.shim));
}


 