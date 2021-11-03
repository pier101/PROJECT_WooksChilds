const express = require("express");
const app = express();

const indexRouter = require("./routes/index.js");

app.use(indexRouter);

const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`${port}번 포트연결`));
