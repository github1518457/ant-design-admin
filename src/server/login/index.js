const expre = require('express');
const router = expre.Router();
const db = require('../db');

/* POST 账号 登录 */
router.post('/login', (req, res) => {
  const { user_name, password } = req.body;
  const sql = 'SELECT * FROM user_list';
  db.query(sql, (error, data) => {
    if (error) return;
    const flag = data.some(
      item => user_name === item.user_name && password === item.password
    );
    if (flag) {
      db.query('SELECT * FROM menu_list', (err, rows) => {
        if (err) return;
        res.send({ code: 0, data: rows, msg: '登录成功', success: true });
      });
    } else {
      res.send({ code: 2001, data: [], msg: '账号或密码错误', success: true });
    }
  });
});

module.exports = router;
