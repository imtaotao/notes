// 示例数据库
// https://dev.mysql.com/doc/index-other.html
// https://www.codenong.com/cs106795844/
const mysql = require('mysql2');

const parseSql = (sql) => {
  const lines = sql.split('\n');
  return lines.map((v) => ` ${v.trim()}`).join('');
};

module.exports = function (cb) {
  const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'test',
    password: 'chentao1994',
  });

  const exec = (sql) => {
    return new Promise((resolve) => {
      sql = parseSql(sql.trim());
      connection.query(sql, (error, results, fields) => {
        if (error) {
          console.log(sql);
          throw error;
        }
        resolve(results);
      });
    });
  };
  connection.connect();
  cb(exec, connection);
};
