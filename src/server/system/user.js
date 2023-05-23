const expre = require('express');
const router = expre.Router();

const db = require('../db');

/* POST 新增用户 */
router.post('/add', (req, res) => {
  const listSql = 'SELECT * FROM user_list';
  const addSql = `insert into user_list (user_name,password) values (?,?)`;
  const user_name = req.body.user_name;
  const password = req.body.password;
  const params = [user_name, password];
  db.query(listSql, (list_error, list_data) => {
    if (list_error) return;
    const flag = list_data.some(item => item.user_name === user_name);
    if (flag) {
      res.send({
        code: 2003,
        msg: '用户已存在，请重新填写',
        success: false
      });
    } else {
      db.query(addSql, params, (add_error, add_data) => {
        if (add_error) return;
        res.send({
          code: 0,
          msg: '创建成功',
          success: true
        });
      });
    }
  });
});

/* GET 用列表 */
router.get('/list', (req, res) => {
  // let query = req.query;
  let sql = 'SELECT * FROM user_list';
  // let sql = `SELECT article.name, test.title FROM article,test WHERE article.id=test.id AND article.name LIKE '%${title}%' AND status IN(1) LIMIT ${start}, ${count}`;
  // let sql = `SELECT * FROM goods_list ORDER BY id DESC`; // 降序
  // let sql = `SELECT * FROM goods_list ORDER BY id ASC`; // 升序
  // let sql = `SELECT * FROM goods_list WHERE status=${query.status},name like %${query.name}%`;
  // let sql = `SELECT * FROM user_list WHERE name like '%${query.name}%' and status=${query.status}`;
  db.query(sql, (error, data) => {
    if (error) return;
    res.send({
      code: 0,
      data: data,
      success: true,
      msg: ''
    });
  });
});

module.exports = router;
