const jwt = require("jsonwebtoken");

const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION,
  UNPERMISSION
} = require("../constants/error-types");

const service = require("../service/user.service");
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");
const authService = require("../service/auth.service");

const verifyLogin = async(ctx, next) => {
  //1、获取用户名和密码
  const { name, password } = ctx.request.body;
  //2、判断用户名和密码是否为空
  if(!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //3、判断用户名是否存在
  const result = await service.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  //4、判断密码和数据库中的密码是否一致(加密)
  console.log(md5password(password));
  console.log(user.password);
  if(md5password(password) !== user.password) {
    const error = new Error(PASSWORD_IS_INCORRECT);
    return ctx.app.emit('error', error, ctx);
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async(ctx, next) => {
  console.log("验证权限的middleware~");

  //1、获取token
  const authorization = ctx.headers.authorization;

  //console.log(authorization);//未授权的时候为undefined
  if(!authorization) {
    const error = new Error(UNAUTHORIZATION); 
    ctx.app.emit("error", error, ctx);
    return;
  }
  const token = authorization.replace('Bearer ', '');
  //2、验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.user = result;
    await next();
  } catch (err) {
    console.log(err);
    const error = new Error(UNAUTHORIZATION); 
    ctx.app.emit("error", error, ctx);
  }
}

/**
 * 1.很多的内容都需要验证权限: 修改/删除动态, 修改/删除评论
 * 2.接口: 业务接口系统/后端管理系统
 *  一对一: user -> role
 *  多对多: role -> menu(删除动态/修改动态)
 */

//1、下面这种写死了，只能修改动态
// const verifyPermission = async (ctx, next) => {
//   console.log("验证权限的middleware~");

//   // 1.获取参数 { commentId: '1' }
//   const [resourceKey] = Object.keys(ctx.params);
//   const tableName = resourceKey.replace('Id', '');
//   const resourceId = ctx.params[resourceKey];
//   const { id } = ctx.user;

//   // 2.查询是否具备权限
//   try {
//     const isPermission = await authService.checkResource(tableName, resourceId, id);
//     if (!isPermission) throw new Error();
//     await next();
//   } catch (err) {
//     const error = new Error(UNPERMISSION);
//     return ctx.app.emit('error', error, ctx);
//   }
// }

//2、下面这种认证，所有的接口都可以进行认证
const verifyPermission = async (ctx, next) => {
  console.log("验证权限的middleware~");

  // 1.获取参数 { commentId: '1' }
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;

  // 2.查询是否具备权限
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id);
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
};