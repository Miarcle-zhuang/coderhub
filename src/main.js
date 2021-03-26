const { app } = require("./app");
require("./app/database");

const config = require("./app/config");

app.listen(config.APP_PORT, () => {
  console.log(`端口号为${APP_PORT}的服务器启动成功`);
});