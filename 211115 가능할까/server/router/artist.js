const express = require("express");
const Feed = require("../models/feed");
const ArtistCard = require("../models/artistcard");
const Comment =require("../models/comment")
const router = express.Router();

//아티스트카드 정보 클라이언트 전달
router.get('/card:name',async(req,res)=>{
    const name = req.params.name
    await ArtistCard.findOne({
        where: {artistName: name}
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
router.post("/posts/:name", (req, res, next) => {
const {content,id} = req.body;
const name = req.params.name

Feed.create({
    feedContent: content,  
    artistName: name,
    userId : id
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
    await ArtistCard.findAll({
        where: {artistName: id}
    }).then(result=>res.send(result)).catch( err => {
        console.log(err)
        throw err;
    })
   // console.log(a)
})


//댓글 수정
router.post("/comment/:id/edit", async (req, res, next) => {
    const {comment, num} = req.body
    const id = req.params.id
    const editComment = await Comment.findOne({where: {commentNum : num}})
    if(editComment){
        await Comment.update({commentContent: comment},{where: {commentNum : num}})
        await Comment.findAll({where:{artistName: id}}).then(data=>res.send(data))
    }
    
    // try {
    //     let classnumber = req.params.id;
    //     let user = res.locals.user.userId;
    //     let commentnumber = req.params.commentnum;
    //     console.log(commentnumber);
    //     let { commentNumber } = req.body;

    //     const b = await Comment.findAll({
    //         where: { classNum: classnumber, userId: user },
    //     });
    //     // return res.json(b);
    //     if (typeof commentNumber == "object") {
    //         for (let i = 0; i < b.length; i++) {
    //             if (b[i].commentNum == commentnumber) {
    //                 await Comment.update(
    //                     {
    //                         commentContent: req.body.updateComment[i],
    //                         updatedAt: Date.now(),
    //                     },
    //                     { where: { commentNum: commentnumber } }
    //                 );
    //             }
    //         }
    //     } else {
    //         for (let i = 0; i < b.length; i++) {
    //             if (b[i].commentNum == commentnumber) {
    //                 await Comment.update(
    //                     {
    //                         commentContent: req.body.updateComment,
    //                         updatedAt: Date.now(),
    //                     },
    //                     { where: { commentNum: commentnumber } }
    //                 );
    //             }
    //         }
    //     }

    
        //
        /*
    4개의 댓글
    updateComment[몇번째가 들어가야되나요? 0~3]
    commentNumber는 랜덤
    */
        //return false;
        // let { commentNumber } = req.body;
        // const a = await Comment.findOne({ where: { commentNum: commentNumber } });
        //console.log(a);


    // } catch (err) {
    //     console.error(err);
    //     next(err);
    // }
});



//댓글 등록
router.post("/comment", async (req, res) => {
    try {

        let { comment,id,feedNumber,name } = req.body;
        // const classes = await Oclass.findOne({
        //   where: { classNum: id },
        // });
        // return false;

        const commentData = await Comment.create({
            userId: id,
            commentContent: comment,
            artistName : name,
            feedNum: Number(feedNumber),
        })
        //json / send 보내는 방식 차이
        res.json(commentData)
 
    } catch (err) {
        console.error(err);

    }
});

//댓글 생성
router.get('/comment/:id',async (req,res)=>{
        const id = req.params.id
        console.log(id)
        
        await Comment.findAll({where:{artistName: id}}).then(data=>res.send(data))
})

//댓글 삭제
router.post("/comment/:id/delete", async (req, res) => {
    const {num} = req.body
    const id = req.params.id
await Comment.destroy({
            where: { commentNum: req.body.num },
})

await Comment.findAll({where:{artistName: id}}).then(data=>res.send(data))
})


module.exports = router;

module.exports = router;