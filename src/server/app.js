const express = require('express');
const http = require('http');
// const path = require("path");
const createError = require('http-errors');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const publicRouter = require('./public/index');
const systemUser = require('./system/user');
const permissionMenu = require('./permission/menu');
const login = require('./login');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//设置允许跨域请求
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  // next();
  if (req.method.toLowerCase() === 'options') {
    res.sendStatus(200); //让options尝试请求快速结束
  } else {
    next();
  }
});

// 后端接口路由
app.use('/api/public', publicRouter); // 公共(像登录、退出等)
app.use('/api/v1/system/user', systemUser); // 用户管理
app.use('/api/v1/permission/menu', permissionMenu); // 用户管理
app.use('/api/v1', login); // 登录

app.use(function (req, res, next) {
  next(createError(404));
});

//监听
server.listen(8095);
