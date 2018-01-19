const Sequelize = require('sequelize');

function select(client, response) {
  const Courses = client.define('teacher', {
    title: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    author: {
      type: Sequelize.STRING
    }
  },{
    freezeTableName: true,
    timestamps: false
  });
  console.log("Request handler 'select' was called.");
    //执行相应的sql语句   
    Courses.findAll().then(users => {
      console.log(users);
      response.setHeader('Content-Type','application/json;charset=UTF-8');
      response.write(JSON.stringify(users));
      response.end();
    })
}

exports.select = select;