var Koa = require('koa');
const fs = require('fs-promise');
const app = new Koa();
let server = require('http').createServer(app.callback());
//socket.io是依赖http服务器
let io = require('socket.io')(server);
//声明一个对象，保存所有的客户端用户名和它们的socket对应关系
let clients = {};
//监听客户端的连接，当连接到来的时候执行此回调函数
io.on('connection',function(socket){
    //在函数的内部声明一个变量，叫username
    let username;
    //监听客户端的发过来的消息，当消息发过来的时候执行回调函数
    socket.on('message',function(data){
        if(username){
            //判断是公聊还是私聊
            let reg = /@([^ ]+) (.+)/;
            let result = data.match(reg);
            if(result){//如果result有值则匹配上了
                //此处是私聊
                let toUser = result[1];
                let content = result[2];
                clients[toUser] && clients[toUser].send({
                    username,
                    content,
                    createAt:new Date()
                });
            }else{//没匹配上
                //正常发言，向所有的客户端进行广播
                io.emit('message',{
                    username,content:data,createAt:new Date()
                });
            }
        }else{
            username = data;//把这个消息当成用户名
            //关联起来
            clients[username]= socket;
            //向所有的客户端广播说有新的用户加入聊天室
            io.emit('message',{
                username:'系统',content:`欢迎 ${username} 加入聊天室`,createAt:new Date()
            });
            //事件的名字可以自定义
            io.emit('user-added',username);
        }
    });
    //监听客户端发过来的请求，把用户数组返回
    socket.on('users',function(){
        let userList = Object.keys(clients);
        socket.emit('userList',userList);
    });
});
server.listen(8080);

app.use(async function (ctx, next) {
  if(ctx.url=='/node_modules/socket.io-client/dist/socket.io.js' || ctx.url=='/node_modules/socket.io-client/dist/socket.io.js.map'){
    const files = await fs.readFile(__dirname + ctx.url);
    ctx.type = '.js';
    ctx.body = files;
  }else{
    const files = await fs.readFile(__dirname + '/index.html');
    ctx.type = 'text/html';
    ctx.body = files;
  }
  
});

const port = 3000;
const hostname = 'localhost';
app.listen(port,hostname,()=>{
  console.log(`\nServer is running at port:${port}`);
  console.log(`url: http://${hostname}:${port}`);
});