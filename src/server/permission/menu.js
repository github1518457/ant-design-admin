const expre = require('express');
const router = expre.Router();
const db = require('../db');

/* GET 菜单 列表 */
router.get('/list', (req, res) => {
  // 获取查询条件和分页参数
  const { name, page, pageSize } = req.query;
  // 组装查询语句
  let sql = 'SELECT * FROM menu_list ORDER BY id DESC';
  let conditions = [];
  if (name) {
    conditions.push(`name LIKE '%${name}%'`);
  }
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }
  // 统计符合条件的数据总数
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        code: 500,
        message: 'Internal server error'
      });
    }
    const total = rows.length;
    // 计算分页参数
    // eslint-disable-next-line no-undef
    const size = parseInt(pageSize) || 10;
    const offset = (parseInt(page) - 1) * size;
    // 执行分页查询
    sql += ` LIMIT ${size} OFFSET ${offset}`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          code: 500,
          message: 'Internal server error'
        });
      }
      res.json({
        code: 0,
        data: {
          list: rows,
          pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            total: total
          }
        },
        success: true,
        msg: ''
      });
    });
  });
});

/* GET 菜单 下拉列表 */
router.get('/all', (req, res) => {
  const sql = 'SELECT * FROM menu_list';
  let list = [];
  db.query(sql, (error, data) => {
    if (error) return;
    data.map(item => {
      const obj = {
        id: item.id,
        name: item.name,
        parentId: item.parentId === 0 ? 0 : item.parentId
      };
      list.push(obj);
    });
    res.send({ code: 0, data: list, success: true, msg: '' });
  });
});

/* GET 菜单 详情 */
router.get('/detail/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM menu_list WHERE id=${id}`;
  db.query(sql, (error, data) => {
    if (error) return;
    res.send({ code: 0, data: data[0], success: true, msg: '' });
  });
});

/* POST 菜单 新增 */
router.post('/create', (req, res) => {
  const { name, type, parentId, status, path, icon, sort } = req.body;
  // const sql = `insert into menu_list (name,type,parentId,status,path,icon,sort) values (name='${name}','type=${type}',parentId='${parentId}',status='${status}',path='${path}',icon='${icon}',sort='${sort}')`;
  const sql = `insert into menu_list (name,type,parentId,status,path,icon,sort) values (?,?,?,?,?,?,?)`;
  const params = [name, type, parentId, status, path, icon, sort];
  db.query(sql, params, (error, data) => {
    if (error) return;
    res.send({ code: 0, msg: '创建成功', success: true });
  });
});

/* DELETE 菜单 删除 */
router.delete('/delete/:id', function (req, res) {
  const { id } = req.params;
  const sql = `DELETE FROM menu_list WHERE id=${id}`;
  db.query(sql, function (error, data) {
    if (error) return;
    res.send({ code: 0, success: true, msg: '删除成功' });
  });
});

/* DELETE 菜单 更新 */
router.put('/update/:id', function (req, res) {
  const { id, name, type, parentId, status, path, icon, sort } = req.body;
  const sql = `UPDATE menu_list SET name='${name}',type='${type}',parentId='${parentId}',status='${status}',path='${path}',icon='${icon}',sort='${sort}' WHERE id='${id}'`;
  db.query(sql, function (error, data) {
    if (error) return;
    res.send({ code: 0, success: true, msg: '更新成功' });
  });
});

/* GET 菜单 列表 */
router.get('/all/list', (req, res) => {
  const sql = 'SELECT * FROM menu_list';
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
