const pg = require( 'pg' );
//构造连接数据库的连接字符串："tcp://用户名:密码@ip/相应的数据库名"   
const conString = 'postgres://postgres:123456@localhost/graphql';
//const conString = "tcp://postgres:123456@localhost/graphql";   
const client = new pg.Client( conString );

client.connect( function ( error ) {
    if ( error ) {
        console.log( 'ClientConnectionReady Error: ' + error.message );
        client.end();
        return;
    }
    console.log( 'client.connect OK.\n' );
} );

module.exports = ( response ) => {
    console.log( 'postSQL-sql:receive a request' );
    client.query( 'select * from courses;', ( error, results ) => {
        if ( error ) {
            console.log( 'error' );
            console.log( 'GetData Error: ' + error.message );
            client.end();
            return;
        }
        if ( results.rowCount > 0 ) {
            response.writeHead( 200, {
                'Content-Type': 'application/json'
            } );
            response.write( JSON.stringify( results ) );
            response.end();
        }
    } );
};