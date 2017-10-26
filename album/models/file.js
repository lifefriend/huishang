const fs=require('fs');
exports.getAllDir=(filepath,callback)=>{
    fs.readdir(filepath, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        let dir=[];
        if(data.length<1){
            callback(null,dir);
            return;
        }
        (function iterator(i){
            fs.stat(filepath+'/'+data[i],(err,stats)=>{
                if (err) {
                    callback(err);
                    return;
                }
                if(stats.isDirectory()){
                    dir.push(data[i]);
                }
                if(i===data.length-1){
                    callback(null,dir);
                    return;
                }else{
                    iterator(++i);
                } 
            });
        })(0); 
    });  
};

exports.getAllFile=(filepath,callback)=>{
    fs.readdir(filepath, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        let files=[];
        if(data.length<1){
            callback(null,files);
            return;
        }
        (function iterator(i){
            fs.stat(filepath+'/'+data[i],(err,stats)=>{
                if (err) {
                    callback(err);
                    return;
                }
                if(stats.isFile()){
                    files.push(data[i]);
                }
                if(i===data.length-1){
                    callback(null,files);
                    return;
                }else{
                    iterator(++i);
                } 
            });
        })(0); 
    });  
};

exports.rename=(oldPath, newPath,callback)=>{
    fs.rename(oldPath, newPath, (err)=>{
        callback(err);       
    });
};

exports.create=(path,callback)=>{
    fs.access(path, fs.constants.F_OK,(err,stats)=>{
        if (err || !stats|| !stats.isDirectory()) {
            fs.mkdir(path, (err)=>{
                callback(err);
            });
        }else{
            callback(new Error());
        }  
    });  
};
exports.delete=(path,callback)=>{
    fs.unlink(path,callback);
}
exports.deleteDir=(filepath,callback)=>{
    fs.readdir(filepath, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        if(data.length<1){
            fs.rmdir(filepath,callback);
            return;
        }
        (function iterator(i){
            fs.stat(filepath+'/'+data[i],(err,stats)=>{
                if (err) {
                    callback(err);
                    return;
                }
                if(stats.isFile()){
                    fs.unlink(filepath+'/'+data[i],(err)=>{
                        if(err){
                            callback(err);
                            return;
                        }
                        if(i===data.length-1){
                            fs.rmdir(filepath,callback);
                            return;
                        }else{
                            iterator(++i);
                        } 
                    });
                }
            });
        })(0); 
    }); 
}
exports.readFile=(filepath,callback)=>{
    fs.readFile(filepath,callback);
};
