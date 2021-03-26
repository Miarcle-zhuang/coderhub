const Router = require("koa-router");

const { 
  create,
  detail,
  list,
  update,
  remove,
  addLabels
} = require("../controller/moment.controller");

const { 
  verifyAuth,
  verifyPermission
 } = require("../middleWare/auth.middleware");

 const {
  verifyLabelExists
} = require('../middleware/label.middleware');

const momentRouter = new Router({ prefix: "/moment" });

//1、发表动态
momentRouter.post('/', verifyAuth, create);
//2、获取动态列表 
momentRouter.get('/', list);
//3、获取单条动态
momentRouter.get('/:momentId', detail);
//4、修改动态
//(1)用户必须登录 (2)用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
//5、用户删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);

//6、用户发表动态的时候，进行添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels);

module.exports = momentRouter;