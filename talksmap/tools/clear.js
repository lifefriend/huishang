"use strict"
const rf=require("fs"); 
const path = require('path');
let data=rf.readFileSync("./main.js","utf-8"); 
let q=data.split('require.config({');
if(q.length<1) return;
let w=q[1].split('})');
let e=eval('({'+w[0]+'})');
if(e.paths){
	let keys= Object.keys(e.paths);
	for(let i=0;i<keys.length;i++){
		let key =keys[i];
		let path=e.paths[key];
		let paths=path.split('/');
		let oldPath='./'+paths[paths.length-1]+".js";
		let newPath='./temp/'+paths[paths.length-1]+".js";
		console.log(oldPath);
		rf.rename(oldPath,newPath,(err)=>{
			err && console.log(err);
		});
	}
}