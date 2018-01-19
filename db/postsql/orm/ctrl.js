const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:123456@localhost/graphql');
const Courses = sequelize.define('teacher', {
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
});
module.exports = (response) => {
  console.log("postSQL-sequelize:receive a request"); 
  Courses.findAll().then(users => {
    response.setHeader('Content-Type', 'application/json;charset=UTF-8');
    response.write(JSON.stringify(users));
    response.end();
  });
};