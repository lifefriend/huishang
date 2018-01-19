const http = require("http");  
const url = require("url");
const route = require("./router"); 
const port = 3000;
const hostname = 'localhost'; 
http.createServer(function(request,response){  
  let pathname = url.parse(request.url).pathname;  
  console.log("Request for " + pathname + " received.");
  route(pathname,response);
}).listen(port,hostname,()=>{
  console.log(`Server is running at port ${port} ==> http://${hostname}:${port}`);
}); 

