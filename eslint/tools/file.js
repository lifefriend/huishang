const fs = require("fs");
const path = require('path');
exports.deleteFile = deleteFile;
exports.deleteDir = deleteDir;
exports.deleteHideDir = deleteHideDir;
exports.emptyFolder = emptyFolder;
exports.copyFile = copyFile;
exports.copyFolder = copyFolder;
exports.isFile = isFile;

function deleteHideDir(dirpath) {
    let isexist = fs.existsSync(dirpath);
    if (!isexist) return;
    let result = fs.readdirSync(dirpath);
    result.forEach((data) => {
        let filepath = path.resolve(dirpath, data);
        let stats = fs.statSync(filepath);
        if (stats.isDirectory() && data.indexOf('.') === 0)
            deleteDir(filepath)
    });
}

function emptyFolder(bulitdir) {
    let isexist = fs.existsSync(bulitdir);
    if (isexist)
        deleteDir(bulitdir);
    try {
        fs.mkdirSync(bulitdir, 511);
    } catch (error) {
        console.log(error);
    }
}

function deleteDir(dirpath) {
    let isexist = fs.existsSync(dirpath);
    if (!isexist) return;
    let result = fs.readdirSync(dirpath);
    result.forEach((data) => {
        let filepath = path.resolve(dirpath, data);
        let stats = fs.statSync(filepath);
        if (stats.isFile())
            deleteFile(filepath);
        else
            deleteDir(filepath);
    });
    try {
        fs.rmdirSync(dirpath);
    } catch (error) {
        console.log(error);
    }
}

function deleteFile(filepath) {
    try {
        fs.unlinkSync(filepath);
    } catch (error) {
        console.log(error);
    }
}

function isFile(path) {
    return exists(path) && fs.statSync(path).isFile();
}

function exists(path) {
    return fs.existsSync(path) || path.existsSync(path);
}

function copyFile(srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function (err) {
        if (err) {
            console.log('read error', srcPath)
        }
        cb && cb(err)
    })

    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function (err) {
        if (err) {
            console.log('write error', tarPath)
        }
        cb && cb(err)
    })
    ws.on('close', function (ex) {
        cb && cb(ex)
    })

    rs.pipe(ws)
}

function copyFolder(srcDir, tarDir, cb) {
    fs.readdir(srcDir, function (err, files) {
        var count = 0
        var checkEnd = function () {
            ++count == files.length && cb && cb()
        }
        if (err) {
            checkEnd()
            return
        }
        files.forEach(function (file) {
            var srcPath = path.join(srcDir, file)
            var tarPath = path.join(tarDir, file)

            fs.stat(srcPath, function (err, stats) {
                if (stats.isDirectory()) {
                    console.log('mkdir', tarPath)
                    fs.mkdir(tarPath, function (err) {
                        if (err) {
                            console.log(err)
                            return
                        }

                        copyFolder(srcPath, tarPath, checkEnd)
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })
        //为空时直接回调
        files.length === 0 && cb && cb()
    })
}