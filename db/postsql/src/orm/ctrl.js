const Sequelize = require( 'sequelize' );
//const sequelize = new Sequelize('postgres://postgres:123456@localhost/graphql');
const Op = Sequelize.Op;
const sequelize = new Sequelize( 'graphql', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
    }
} );
const Courses = sequelize.define( 'teacher', {
    title: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    author: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
} );
module.exports = ( response ) => {
    console.log( 'postSQL-sequelize:receive a request' );
    Courses.findAll().then( users => {
        response.setHeader( 'Content-Type', 'application/json;charset=UTF-8' );
        response.write( JSON.stringify( users ) );
        response.end();
    } );
};