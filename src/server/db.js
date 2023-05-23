const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost", // 主机名或ID地址
  port: 3306, // 端口号
  user: "admin", // 用户名
  password: "root", // 密码
  database: "admin", // 数据库名
});

module.exports = db;
