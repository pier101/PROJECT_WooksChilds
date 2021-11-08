const express = require("express");
const Feed = require("../models/feed");
const router = express.Router();



//전체 게시글 클라이언트에게 전달해주는 라우터
router.get('/posts',async(req,res,next)=>{
    await Feed.findAll().then(result=>res.send(result))
    .catch(err=>{
        console.log(err) 
        throw err;
    });
});

  //게시글 생성
router.post("/posts", (req, res, next) => {
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


module.exports = router;