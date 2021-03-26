const Router = require("koa-router");

const {
  verifyUser,
  handlePassword
} = require("../middleWare/user.middleware");

const UserController = require("../controller/user.controller");

const userRouter = new Router({ prefix: "/user" });

userRouter.post('/', verifyUser, handlePassword, UserController.create);
userRouter.get('/:userId/avatar', UserController.avatarInfo);

module.exports = userRouter;