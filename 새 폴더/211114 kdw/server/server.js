const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const pageRouter = require("./router/page.js");
const artistRouter = require('./router/artist')
const authRouter = require('./router/auth')
const mypageRouter = require('./router/mypage')
const boardRouter = require("./router/board");




const app = express();
sequelize
.sync({ force: false })
.then(() => {
  console.log("데이터베이스 연결 성공");
})
.catch((err) => {
  console.error(err);
});

app.use(cors());
app.use(express.urlencoded({
  limit:"5mb",
  extended: true}));
app.use(express.json({limit:"5mb"}));

app.use("/", pageRouter);
app.use('/artist', artistRouter)
app.use('/auth', authRouter)
app.use("/mypage", mypageRouter)
app.use("/board", boardRouter);


const port = 5000;
app.listen(port, () => {
  console.log(`${port}번 포트에 연결`);
});

