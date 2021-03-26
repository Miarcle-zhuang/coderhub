const errorTypes = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let message, status;
  
  switch(error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      message = "用户名和密码不能为空";
      status = 400;//bad request
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      message = "用户名已被注册";
      status = 409;//conflict
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      message = "用户名不存在";
      status = 400;//参数错误
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      message = "登录密码错误";
      status = 400;//参数错误
      break;
    case errorTypes.UNAUTHORIZATION:
      message = "token已失效";
      status = 401;//token失效
      break;
    case errorTypes.UNPERMISSION:
      status = 401; // 参数错误
      message = "您不具备操作的权限~";
      break;
    default:
      status = 404
      message = "Not Found";
      break;
  }

  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;