const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY} = require("../app/config");

class LoginController {
  async login(ctx, next) {
    //1、获取用户信息
    const { id, name} = ctx.user;
    //2、获取到 token
    const token = jwt.sign({id, name}, PRIVATE_KEY, { 
      expiresIn: 24 * 60 *60,
      algorithm: 'RS256' 
    });
    //3、颁发token
    ctx.body = {
      id,
      name,
      token
    }
    await next();
  }

  async success(ctx, next) {
    ctx.body = "授权成功";
    await next();
  }
}

module.exports = new LoginController();