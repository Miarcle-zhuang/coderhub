const service = require("../service/user.service");
const md5password = require("../utils/password-handle");

const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS
} = require("../constants/error-types");

//(一)判断用户名和密码是否为空、判断注册的用户是否注册过
const verifyUser = async(ctx, next) => {
  //1、获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2、判断用户名或者密码不能空
  if(!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  //3、判断这次注册的用户名有没有被注册过
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
};

//(二)将密码进行加密再存储到数据库中
const handlePassword = async(ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword
}