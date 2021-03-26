const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const useRoutes = require('../router');
const errorHandler = require("./error-handle");

const app = new Koa();

app.use(bodyParser());

app.useRoutes = useRoutes;
app.useRoutes();

app.on("error", errorHandler);

module.exports = {
  app
};