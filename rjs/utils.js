const fs=require("fs"); 
const path = require('path');
exports.deleteDir = deleteDir;
exports.emptyFolder=(bulitdir)=>{
    let isexist=fs.existsSync(bulitdir);
    if(isexist)
        deleteDir(bulitdir);
    fs.mkdirSync(bulitdir,511);
};
function deleteDir(dirpath){
    let result=fs.readdirSync(dirpath);
    result.forEach((data)=>{
        let filepath=path.resolve(dirpath,data);
        let stats=fs.statSync(filepath);
        if(stats.isFile())
            fs.unlinkSync(filepath);
        else
            deleteDir(filepath);
    });  
    fs.rmdirSync(dirpath);
}