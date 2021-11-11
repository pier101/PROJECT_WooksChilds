const express = require("express");
const Feed = require("../models/feed");
const ArtistCard = require("../models/artistcard");
const router = express.Router();

//아티스트카드 정보 클라이언트 전달
router.get('/card:name',async(req,res)=>{
    artistName = req.params.name
    await ArtistCard.findOne({
        where: {artistName: artistName}
    }).then(data=>res.send(data))
})

//전체 게시글 클라이언트에게 전달해주는 라우터
router.get('/posts/:id',async(req,res,next)=>{
    const id = req.params.id

    await Feed.findAll({where:{artistName: id}}).then(result=>res.send(result))
    .catch(err=>{
        console.log(err) 
        throw err;
    });
});

  //게시글 생성
router.post("/posts/:id", (req, res, next) => {
const {content} = req.body;
const id = req.params.id
console.log(id)
console.log(content)
Feed.create({
    feedContent: content,  
    artistName: id
})
    .then((result) => {
        res.send(result)
    })
    .catch( err => {
        console.log(err)
        throw err;
    })
});

router.get("/artistinfo/:id",async(req,res,next)=>{

    const id = req.params.id
    console.log(req.params.id)
    console.log('여기')
    await ArtistCard.findAll({
        where: {artistName: id}
    }).then(result=>res.send(result)).catch( err => {
        console.log(err)
        throw err;
    })
   // console.log(a)
})

module.exports = router;