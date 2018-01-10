var fs = require('fs');
var xlsx2json = require("node-xlsx");

var list = xlsx2json.parse("./test.xls");

fs.writeFileSync("./output.json", JSON.stringify(list));

//以下为统计信息，不同的业务逻辑不同

var file = "./output.json";
var result = JSON.parse(fs.readFileSync(file));
var socreArr=[];
for (var i = 2; i < result.length; i++) {
  var obj = result[i];
  var name = obj.name;
  var data = obj.data;
  var totalScore=0;
  for (var j = 0; j < data.length; j++) {
    var col = data[j];
    totalScore +=getScore(col[3]);
  }
  var temp={
      code: getCode(name),
      boundaryurl:`assets/data/json/${name}市.json`,
      boundarylayer:null,
      score:totalScore
  }
  socreArr.push(temp);
}
fs.writeFileSync("./output1.json", JSON.stringify(socreArr));

function getScore(grade) {
  var score = 0;
  switch (grade) {
    case "A":
      score = 10;
      break;
    case "B":
      score = 7;
      break;
    case "C":
      score = 5;
      break;
    case "D":
      score = 3;
      break;
  }
  return score;
}

function getCode(name){
  var regions= [
      { name: "XX", code: "0000"  }
  ];
  for (var i = 0; i < regions.length; i++) {
      var region=regions[i];
      if(region.name==name){
          return region.code;
      }
  }
  return null;
}