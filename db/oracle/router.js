let handle={};
handle["/"] = (response)=>response.end("welcome");
handle["/oracle"] = require("./sql/ctrl");  

module.exports=function(pathname,response){  
  console.log("About to route a request for " + pathname);  
  if(typeof handle[pathname] === 'function'){  
      handle[pathname](response);
  }else{  
      console.log("No request handle found for " + pathname +'\n');  
      response.writeHead(404,{"Content-Type":"text/plain"});  
      response.write("404 Not found");  
      response.end();  
  }  
}   