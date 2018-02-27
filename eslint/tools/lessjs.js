const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const file = require('./file');

//解决win下中文乱码
const iconv = require('iconv-lite');
const encoding = 'cp936';
const binaryEncoding = 'binary';

let sourcePath, targetPath;

//获取命令行中的路径  
process.argv.forEach(function (val, index, array) {
  if (index == 2) {
    sourcePath = val;
  }
  if (index == 3) {
    targetPath = val;
  }
})

if (sourcePath && targetPath) {
  file.emptyFolder(targetPath);
  read_dir(sourcePath, targetPath);
}

function read_dir(rootPath, targetPath) {
  //取得当前绝对路径  
  rootPath = path.resolve(rootPath);
  //目标路径绝对路径  
  targetPath = path.resolve(targetPath);
  //判断目录是否存在  
  fs.exists(rootPath, function (exists) {
    //路径存在  
    if (exists) {
      //获取当前路径下的所有文件和路径名  
      var childArray = fs.readdirSync(rootPath);
      if (childArray.length) {
        for (var i = 0; i < childArray.length; i++) {
          var currentFilePath = path.resolve(rootPath, childArray[i]);
          var currentTargetPath = path.resolve(targetPath, childArray[i])
          //读取文件信息  
          var stats = fs.statSync(currentFilePath);
          //若是目录则递归调用  
          if (stats.isDirectory()) {
            read_dir(currentFilePath, currentTargetPath);
          } else {
            //判断文件是否为less文件  
            if (path.extname(currentFilePath) === ".less") {
              var newFilePath = path.resolve(targetPath, path.basename(currentFilePath, '.less') + ".css");
              if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath);
              }
              //console.log(newFilePath);
              doLessc(currentFilePath, newFilePath);
            }
          }
        }
      }
    } else {
      console.log("directory is not exists");
    }
  });
}

function doLessc(currentFilePath, newFilePath) {
  //child_process.exec("lessc -x " + currentFilePath + " > " + newFilePath); 
  var cmd = ['lessc ', currentFilePath, ' > ', newFilePath].join('');
  child_process.exec(cmd, {
      encoding: binaryEncoding
    },
    function (error, stdout, stderr) {
      if (error) {
        console.log('error', iconv.decode(new Buffer(error.message, binaryEncoding), encoding));
        return;
      }
      if (stdout)
        console.log('stdout', iconv.decode(new Buffer(stdout, binaryEncoding), encoding));
      if (stderr)
        console.log('stderr', iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
    });
}