const path=require('path');
const formidable = require('formidable');
const file = require('../models');
exports.showError=(req,res)=>{
    res.render('404.ejs');
};
exports.showFavicon=(req,res)=>{
    let tag="showFavicon";
    file.readFile('./favicon.ico',(err,data)=>{
        if(err){
            processError(tag,err);
            return;
        }
        res.send(data);
    });
}
exports.showAlbum=(req,res,next)=>{
    let tag="showAlbum";
    let filepath= path.normalize(__dirname+'/../uploads');
    file.getAllDir(filepath,(err,dirs)=>{
        if(err){
            processError(tag,err,next);
            return;
        }
        res.render('album.ejs',{
            dirs
        });
    });    
};
exports.showPic=(req,res,next)=>{
    let tag="showPic";
    let albumname=req.params.albumname;
    let filepath= path.normalize(__dirname+'/../uploads/'+albumname);
    file.getAllFile(filepath,(err,files)=>{
        if(err){
            processError(tag,err,next);
            return;
        }
        res.render('pics.ejs',{
            albumname,
            files
        });
    });  
};
exports.upload=(req,res,next)=>{
    let tag="upload";
    let filepath= path.normalize(__dirname+'/../uploads');
    file.getAllDir(filepath,(err,dirs)=>{
        if(err){
            processError(tag,err,next);
            return;
        }
        res.render('upload.ejs',{
            dirs
        });
    });
};
exports.uploading=(req,res,next)=>{
    let tag="uploading";
    let form = new formidable.IncomingForm();
    form.multiples=true;
    form.uploadDir = "./temp";   
    form.parse(req, function(err, fields, files) {
        if(err){
            processError(tag,err,next);
            return;
        } 
        let inputFiles=files.inputFile;       
        let albumname=fields.albumname;
        if(albumname===undefined || albumname===null || albumname===""){
            res.send('请选择相册');
            return;
        }
        if(Array.isArray(inputFiles)){
            (function iterator(index){
                if(index===inputFiles.length)
                {
                    res.redirect('/'+albumname); 
                    return;
                }                             
                savePic(albumname,inputFiles[index],(err)=>{
                    if(err){
                        processError(tag,err,next);
                        return;
                    }else{
                        iterator(++index);
                    }  
                });
            })(0); 
        }else{
            savePic(albumname,inputFiles,(err)=>{
                if(err){
                    processError(tag,err,next);
                    return;
                }
                res.redirect('/'+albumname); 
            });     
        }          
    });
};

exports.create=(req,res,next)=>{
    res.render('create.ejs');
};
exports.creating=(req,res,next)=>{
    let tag="creating";
    let form = new formidable.IncomingForm();
    form.uploadDir = "./temp"; 
    form.parse(req, function(err, fields, files) {
        if(err){
            processError(tag,err,next);
            return;
        } 
        let albumname=fields.albumname;
        if(albumname===undefined || albumname===null || albumname===""){
            res.send('相册名不能为空');
            return;
        }
        let path='./uploads/'+albumname;
        file.create(path,(err)=>{
            if(err){
                processError(tag,err,next);
                return;
            } 
            res.redirect('/');
        });
    });  
};

exports.deletePic=(req,res,next)=>{
    let tag="deletePic";
    let albumname =req.params.albumname;
    let filepath= path.normalize('./uploads/'+albumname+'/'+req.params.name);
    file.delete(filepath,(err)=>{
        if(err){
            processError(tag,err,next);
            return;
        }
        res.redirect('/'+albumname); 
    });
};
exports.deleteDir=(req,res,next)=>{
    let tag="deleteDir";
    let albumname =req.params.albumname;
    let filepath= path.normalize('./uploads/'+albumname);
    file.deleteDir(filepath,(err)=>{
        if(err){
            processError(tag,err,next);
            return;
        }
        res.redirect('/'); 
    });
};

function savePic(albumname,uplaodfile,callback){
    if(uplaodfile.size===0) {
        callback('请选择相片');
        return;
    }
    let extname=path.extname(uplaodfile.name);
    let saveName =(new Date()).getTime();
    let randomNum= parseInt(Math.random()*10000);
    let savePath='./uploads/'+albumname+'/'+ saveName + randomNum + extname;
    let oldPath=uplaodfile.path;
    file.rename(oldPath, savePath, (err)=>{
        callback(err);
    });
}
function processError(tag,err,callback){
    console.log('==>'+'route.js'+'==='+tag+'<==');
    console.log(err);
    callback && callback();
}