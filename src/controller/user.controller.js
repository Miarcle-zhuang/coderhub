const fs = require("fs");

const userService = require("../service/user.service");
const fileService = require('../service/file.service');

const { AVATAR_PATH } = require('../constants/file-path');

class UserController {
  async create(ctx, next) {
    //1、获取用户请求过来的参数
    const user = ctx.request.body; 
    //2、查询数量
    const result = await userService.create(user);
    //3、返回数据
    ctx.response.body = result;
  }

  async avatarInfo(ctx, next) {
    // 1.用户的头像是哪一个文件呢?
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);

    // 2.提供图像信息
    ctx.response.set('content-type', avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();