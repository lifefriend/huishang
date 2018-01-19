const oracledb = require('oracledb');
const config={
  user: 'username',
  password: 'password',
  connectString: '127.0.0.0:1521/orcl'
};
module.exports=(response)=>{
  console.log("oracle-sql:receive a request"); 
  oracledb.getConnection(config,(err, connection)=>{
      if (err) throw Error(err);
      connection.execute(
        "SELECT department_id, department_name FROM departments WHERE manager_id < :id",
        [1072],
        (err, result)=> {
            if (err) throw Error(err);
            response.setHeader('Content-Type','application/json;charset=UTF-8');
            response.write(JSON.stringify(result));
            response.end();
        });
  });
}