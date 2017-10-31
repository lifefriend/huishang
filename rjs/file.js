const fs=require("fs"); 
const path = require('path');
exports.deleteDir = deleteDir;
exports.deleteHideDir = deleteHideDir;
exports.emptyFolder=emptyFolder;

function deleteHideDir(dirpath){
    let result=fs.readdirSync(dirpath);
    result.forEach((data)=>{
        let filepath=path.resolve(dirpath,data);
        let stats=fs.statSync(filepath);
        if(stats.isDirectory() && data.indexOf('.')===0)
            deleteDir(filepath)
    });  
}
function emptyFolder(bulitdir){
    let isexist=fs.existsSync(bulitdir);
    if(isexist)
        deleteDir(bulitdir);
    try {
        fs.mkdirSync(bulitdir,511);
    } catch (error) {
        console.log(error);
    }   
}
function deleteDir(dirpath){
    let result=fs.readdirSync(dirpath);
    result.forEach((data)=>{
        let filepath=path.resolve(dirpath,data);
        let stats=fs.statSync(filepath);
        if(stats.isFile())
            try {
                fs.unlinkSync(filepath);
            } catch (error) {
                console.log(error);
            }           
        else
            deleteDir(filepath);            
    });  
    try {
        fs.rmdirSync(dirpath);
    } catch (error) {
        console.log(error);
    }    
}