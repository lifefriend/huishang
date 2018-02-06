const fs = require("fs");
const path = require('path');
const file = require('./file');
const UglifyJS = require("uglify-es");

let args = process.argv.splice(2);
let srcPathName = path.join(process.cwd(), args[0]);
let outPathName = path.join(process.cwd(), args[1]);

file.emptyFolder(outPathName);
file.copyFolder(srcPathName, outPathName, function (err) {
  if (err) throw err;
  file.deleteHideDir(outPathName);
  scanDir(outPathName);
});

function scanDir(rootPath) {
  //读取目录  
  fs.readdir(rootPath, function (dirErr, files) {
    if (!dirErr) {
      files.forEach(function (fileName) {
        //当前文件路径  
        var tmpPath = rootPath + "/" + fileName;
        //获取文件状态  
        fs.stat(tmpPath, function (statErr, stat) {
          if (statErr) {
            console.log("stat error:" + statErr);
          }
          //是个目录  
          else if (stat.isDirectory()) {
            scanDir(tmpPath);
          } else {
            //是js文件  
            if (/\.[^\.]+$/.exec(fileName)[0].toLowerCase() === ".js") {
              compressFile(tmpPath);
            }
          }
        });
      });
    } else
      console.log("dir error");
  })
}

function compressFile(path) {
  buildOne(path, path);
}

function buildOne(flieIn, fileOut) {
  let origCode = fs.readFileSync(flieIn, 'utf8');
  let option = {
    compress: true,
    mangle: true,
    sourceMap: true
  };
  let result = UglifyJS.minify(origCode, option);
  if (result.error)
    console.log(result.error);
  else {
    fs.writeFileSync(fileOut, result.code, 'utf8');
    option.sourceMap && fs.writeFileSync(fileOut + '.map', result.map, 'utf8');
  }
}