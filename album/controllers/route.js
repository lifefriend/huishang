const path=require('path');
const formidable = require('formidable');
const file = require('../models');
exports.showError=(req,res)=>{
    res.render('404.ejs');
};
exports.showAlbum=(req,res,next)=>{
    let filepath= path.normalize(__dirname+'/../uploads');
    file.getAllDir(filepath,(err,dirs)=>{
        if(err){
            next();
            return;
        }
        res.render('album.ejs',{
            dirs
        });
    });    
};
exports.showPic=(req,res,next)=>{
    let albumname=req.params.albumname;
    let filepath= path.normalize(__dirname+'/../uploads/'+albumname);
    file.getAllFile(filepath,(err,files)=>{
        if(err){
            next();
            return;
        }
        res.render('pics.ejs',{
            albumname,
            files
        });
    });  
};
exports.upload=(req,res,next)=>{
    let filepath= path.normalize(__dirname+'/../uploads');
    file.getAllDir(filepath,(err,dirs)=>{
        if(err){
            next();
            return;
        }
        res.render('upload.ejs',{
            dirs
        });
    });
};
exports.uploading=(req,res,next)=>{
    let form = new formidable.IncomingForm();
    form.multiples=true;
    form.uploadDir = "./temp";   
    form.parse(req, function(err, fields, files) {
        if(err){
            next();
            return;
        } 
        let inputFiles=files.inputFile;       
        let albumname=fields.albumname;
        if(Array.isArray(inputFiles)){
            (function iterator(index){
                if(index===inputFiles.length)
                {
                    res.redirect('/'+albumname); 
                    return;
                }                             
                savePic(albumname,inputFiles[index],(err)=>{
                    if(err){
                        next();
                        return;
                    }else{
                        iterator(++index);
                    }  
                });
            })(0); 
        }else{
            savePic(albumname,inputFiles,(err)=>{
                if(err){
                    next();
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
    let form = new formidable.IncomingForm();
    form.uploadDir = "./temp"; 
    form.parse(req, function(err, fields, files) {
        if(err){
            next();
            return;
        } 
        let albumname=fields.albumname;
        let path='./uploads/'+albumname;
        file.create(path,(err)=>{
            if(err){
                next();
                return;
            } 
            res.redirect('/');
        });
    });  
};

exports.deletePic=(req,res,next)=>{
    let albumname =req.params.albumname;
    let filepath= path.normalize('./uploads/'+albumname+'/'+req.params.name);
    file.delete(filepath,(err)=>{
        if(err){
            next();
            return;
        }
        res.redirect('/'+albumname); 
    });
};
exports.deleteDir=(req,res,next)=>{
    let albumname =req.params.albumname;
    let filepath= path.normalize('./uploads/'+albumname);
    file.deleteDir(filepath,(err)=>{
        if(err){
            console.log(err);
            next();
            return;
        }
        res.redirect('/'); 
    });
};

function savePic(albumname,uplaodfile,callback){
    let extname=path.extname(uplaodfile.name);
    let saveName =(new Date()).getTime();
    let randomNum= parseInt(Math.random()*10000);
    let savePath='./uploads/'+albumname+'/'+ saveName + randomNum + extname;
    let oldPath=uplaodfile.path;
    file.rename(oldPath, savePath, (err)=>{
        callback(err);
    });
}