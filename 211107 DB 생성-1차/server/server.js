const express = require("express");
const { sequelize } = require("./models");
const Feed = require("./models/feed");

const indexRouter = require("./router/index.js");

const cors = require("cors");
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

//게시글
// app.get("/posts", (req, res)=>{
//   connection.query(

//     'SELECT * FROM NOTICE',
//     (err, rows, fields) => {
    
//     res.send(rows);
//     })
//   })

//전체 게시글 클라이언트에게 전달해주는 라우터
app.get('/posts',async(req,res,next)=>{
  await Feed.findAll().then(result=>res.send(result))
  .catch(err=>{
      console.log(err) 
      throw err;
  });
});

//게시글 생성
app.post("/posts", (req, res, next) => {
  const {content} = req.body;
  console.log(content)
  Feed.create({
      feedContent: content,  
      //adminId: req.login.adminid
  })
      .then((result) => {
        res.send(result)
      })
      .catch( err => {
        console.log(err)
        throw err;
    })
});

const port = 5000;
app.listen(port, () => {
  console.log(`${port}번 포트에 연결`);
});

