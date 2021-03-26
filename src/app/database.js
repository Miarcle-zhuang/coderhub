const mysql = require("mysql2");

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = require("./config");

const connection = mysql.createPool({
  host:  MYSQL_HOST,
  port:  MYSQL_PORT,
  user:  MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
});

connection.getConnection((err, conn) => {
  if(err) {
    console.log("数据库连接失败", err);
  } else {
    console.log("数据库连接成功");
  }
});

module.exports = connection.promise();