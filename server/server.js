const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const Notice = require("./models/notice");

const indexRouter = require("./router/index.js");

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


app.use("/", indexRouter);


// app.post('/add/data', (req, res) => {
//   console.log(req.body);

//   Sample1.create({
//       name : req.body.name,
//       email : req.body.email
//   })
//   .then( result => {
//       res.send(result)
//   })
//   .catch( err => {
//       console.log(err)
//       throw err;
//   })
// })

//게시글 받아오기
app.get('/post',async(req,res,next)=>{
  await Notice.findAll()
  // .then(res=>{res.send(res)})
  .then(notice=>{res.send(notice)})
  .catch(err=>{
      console.log(err) 
      throw err;
  });
});

//게시글 생성 
// app.post("/posts", (req, res, next) => {
//   let body = req.body;
//   console.log(body)
//   Notice.create({
//     noticeTitle: body.noticeTitle,
//     noticeContent: body.noticeContent,
//   })
  app.post("/posts", async(req, res, next) => {
    const {noticeTitle,noticeContent,content} =  req.body;
    console.log(req.body)
     Notice.create({
        noticeContent:content,
    })
      .then((result) => {
        res.send(result)
      })
      .catch( err => {
        console.log(err)
        throw err;
    })
});




//server포트
const port = 5000;
app.listen(port, () => {
  console.log(`${port}번 포트에 연결`);
});

