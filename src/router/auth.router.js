const Router = require("koa-router");

const { 
  login,
  success
} = require("../controller/auth.controller");
const { 
  verifyLogin,
  verifyAuth
 } = require("../middleWare/auth.middleware");

const loginRouter = new Router();

loginRouter.post('/login', verifyLogin, login);
loginRouter.get('/test', verifyAuth, success);

module.exports = loginRouter;