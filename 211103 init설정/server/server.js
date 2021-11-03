const express = require("express");
const app = express();
const basic = require("./router/index.js");
const cors = require("cors");
const request = require("request");

app.use(cors());
app.use("/", basic);

const port = 3001;

app.listen(port, () => {
  console.log(`${port}번 포트에 연결`);
});
