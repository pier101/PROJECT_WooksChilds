const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const pageRouter = require("./router/page.js");
const artistRouter = require('./router/artist')
const authRouter = require('./router/auth')



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
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", pageRouter);
app.use('/artist', artistRouter)
app.use('/auth', authRouter)


const port = 5000;
app.listen(port, () => {
  console.log(`${port}번 포트에 연결`);
});

