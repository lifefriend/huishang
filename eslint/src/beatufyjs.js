const fs = require( 'fs' );
const path = require( 'path' );
const child_process = require( 'child_process' );
const defaults = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    cwd: null,
    env: null
};
// 解决win下中文乱码
// const iconv = require('iconv-lite'); 
// const encoding = 'cp936';
// const binaryEncoding = 'binary';
// console.log(iconv.decode(new Buffer(error.message, binaryEncoding), encoding));


for ( let arg of process.argv.splice( 2 ) ) {
    //通匹符，暂支持 *.js
    if ( arg.indexOf( '*.js' ) == 0 ) {
        read_dir_current( process.cwd() );
        continue;
    }
    let pathName = path.join( process.cwd(), arg );
    if ( isFile( path.join( process.cwd(), arg ) ) ) {
        beatufy( pathName );
    } else {
        read_dir( pathName );
    }
}

function read_dir( dir ) {
    let files = fs.readdirSync( dir );
    for ( let file of files ) {
        let pathName = path.join( dir, file );
        if ( isFile( pathName ) ) {
            beatufy( pathName );
        } else {
            read_dir( pathName );
        }
    }
}

function read_dir_current( dir ) {
    let files = fs.readdirSync( dir );
    for ( let file of files ) {
        let pathName = path.join( dir, file );
        if ( isFile( pathName ) && checkExt( file, '.js' ) ) {
            beatufy( pathName );
        }
    }
}

function isFile( path ) {
    return exists( path ) && fs.statSync( path ).isFile();
}

function exists( path ) {
    return fs.existsSync( path ) || path.existsSync( path );
}

function checkExt( str, ext ) {
    var pos = str.lastIndexOf( ext );
    if ( pos === -1 ) {
        return false;
    } else {
        return pos + 3 === str.length;
    }
}

function beatufy( pathName ) {
    child_process.exec( `node ./node_modules/js-beautify/js/bin/js-beautify.js -P -E -j -a ${pathName} -r`, defaults, function ( error, stdout, stderr ) {
        //console.log( '-------------------begin----------------------------' );
        if ( error ) {
            console.log( error.message );
        }
        if ( stderr ) {
            console.log( stderr );
        }
        console.log( stdout.replace( '\\\\n', '' ) );
        //console.log( '---------------------end--------------------------' );
    } );
}