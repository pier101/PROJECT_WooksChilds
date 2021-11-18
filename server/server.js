const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const pageRouter = require("./router/page.js");
const artistRouter = require('./router/artist')
const authRouter = require('./router/auth')
const adminRouter = require('./router/admin')
const Artistcards = require('./models/artistcard');
const Goods = require("./models/goods");



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
app.use('/admin', adminRouter)



////////main 페이지 아티스트카드 불러올꺼
app.get('/artistCard', async (req, res, next) => {
  try {
       
      res.send( await Artistcards.findAll() );
  } catch (err) {
      next(err);
  }
});
//////////shop 페이지 구즈카드
app.get('/goodsCard', async (req, res, next) => {
  try {
  const goodsCard= await Goods.findAll(
    { include: {model: Artistcards}
  })
  console.log(goodsCard)
  
    res.send( goodsCard);
  } catch (err) {
      next(err);
  }
});


//////////////////////////////////////////네이버 검색 api
var client_id = 'WBUTkxSJHkAOIVSM0i78';
var client_secret = 'tS6kxuYMb1';
app.get('/search', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/search/image?query=' + encodeURI(req.query.query); // json 결과
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) { 
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
      
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });



const port = 5000;
app.listen(port, () => {
  console.log(`${port}번 포트에 연결`);
});

