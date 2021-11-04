const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    proxy(["/", "/posts"],{
      target: "http://localhost:5000",
    })
  );
};
