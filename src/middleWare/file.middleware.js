const Multer = require('koa-multer');

const avatarUpload = Multer({
  dest: "./uploads/avatars"
});
const avatarHandler = avatarUpload.single('avatar');

module.exports = {
  avatarHandler
}