//加载相应的模块，这儿使用的是postgresql数据库，因此加载的模块是pg。使用不同的数据库可以加载相应的模块  
const pg = require('pg');  
const Sequelize = require('sequelize'); 
//加载内部模块   
var server = require("./server");  
var router = require("./router");  
var func = require("./function");  
  
//将url路径对应到相应的函数   
var handle = {};  
handle["/"] = func.select;  
handle["/select"] = func.select;  
  
const sequelize = new Sequelize('postgres://postgres:123456@localhost/graphql');

console.log("client.connect OK.\n");  
server.start(sequelize,router.route,handle); //启动server  