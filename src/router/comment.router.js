const Router = require('koa-router');

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller.js')

const commentRouter = new Router({prefix: '/comment'});

// 1、发表评论
commentRouter.post('/', verifyAuth, create);
//2、回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply);
//3、修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
//4、删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove);
//5、获取评论列表
commentRouter.get('/', list);

module.exports = commentRouter;