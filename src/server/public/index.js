const expre = require("express");
const router = expre.Router();

const db = require("../db");

/* POST 登录 */
router.post("/login", (req, res) => {
  let account = req.body.user_name;
  let password = req.body.password;
  let sql = `SELECT user_name,password FROM user_list WHERE user_name=? AND password=?`;
  db.query(sql, [account, password], (error, data) => {
    if (error) return;
    if (data.length === 0) {
      res.send({
        code: 2001,
        success: false,
        msg: "账号或密码错误",
      });
    } else {
      res.send({
        code: 0,
        success: true,
        msg: "登录成功",
      });
    }
  });
});

module.exports = router;
