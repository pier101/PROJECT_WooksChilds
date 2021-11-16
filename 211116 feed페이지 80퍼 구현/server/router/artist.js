const express = require("express");
const Feed = require("../models/feed");
const ArtistFeed = require("../models/artistfeed ");
const ArtistCard = require("../models/artistcard");
const Comment =require("../models/comment")
const Follow = require('../models/follow');
const FollowList = require('../models/followlist');
const User = require('../models/user');
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
router.post("/posts/:name",async (req, res, next) => {
const {content,id} = req.body;
const name = req.params.name
console.log("유저게시물작성")
const isUser = await User.findOne({where:{
    userId: id
}})
console.log(isUser.role)
if(isUser.role ==="artist"){
    return res.send("이 공간에서는 유저분들만 글을 게시할 수 있어요😉")
}else if(isUser.role==="user"){
    await Feed.create({
        feedContent: content,  
        artistName: name,
        userId : id
    })

    await Feed.findAll({where:{
        artistName: name
    }
    }).then(data=>res.json(data))
    }
});

//아티스트 글 생성
router.post("/Aposts/:name", async(req, res, next) => {
const {content,id} = req.body;
const name = req.params.name
console.log("아티스트게시글작성")
console.log(content)
console.log(id)
console.log(name)
    const isUser = await User.findOne({where:{
        userId: id
    }})

    if(isUser.role ==="user"){
        return res.send(alert("이 공간에서는 아티스트분들만 글을 게시할 수 있아요!"))
    }else if(isUser.role==="artist"){
        await ArtistFeed.create({
            artistfeedContent: content,  
                    artistName: name,
                    userId : id
        })

        await ArtistFeed.findAll({where:{
            artistName: name
        }
        }).then(data=>res.json(data))
    }

    // .then((result) => {
    //     res.send(result)
    // })
    // .catch( err => {
    //     console.log(err)
    //     throw err;
    // })
});
//게시글 삭제
router.post("/posts/:name/delete", async(req, res, next) => {
    try{
        const {feednum} = req.body;
        const name = req.params.name
    
        await Feed.destroy({where:{
            feedNum: feednum,
            artistName : name
        }})
        
        await Feed.findAll({where:{
            artistName : name
        }}).then(data=>res.json)
    } catch (err) {
        console.error(err);
    }
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

//아티스트피드 댓글 등록
router.post("/comment/artistfeed", async (req, res) => {
    try {
        let { comment,id,artistFeedNumber,name } = req.body;
        
        const commentData = await Comment.create({
            userId: id,
            commentContent: comment,
            artistName : name,
            artistFeedNum: Number(artistFeedNumber),
        })
        //json / send 보내는 방식 차이
        res.json(commentData)
    } catch (err) {
        console.error(err);
        
    }
});
//댓글 생성
router.get('/comment/artistfeed/:id',async (req,res)=>{
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




router.post("/follow/:name", async (req,res)=>{
    try{
        const name = req.params.name
        const {id}= req.body;
        await Follow.create({
            userId: id,
            artistName:name
        })
        // await FollowList.create({
        //     followNum: 
        //     userId: id,
        //     artistName:name
        // })
        await Follow.findAll({
            where: {artistName: name}    
        }).then(data=>res.json(data.length))
    }  catch (err) {
        console.error(err);
    }
})

router.post("/unfollow/:name", async (req,res)=>{
    try{
        const name = req.params.name
        const {count,id}= req.body;
        console.log(count)
        await Follow.destroy({
            where:{
                userId: id,
                artistName:name
            }
        })
        // await FollowList.create({
        //     followNum: 
        //     userId: id,
        //     artistName:name
        // })
        await Follow.findAll({
            where: {artistName: name}    
        }).then(data=>res.json(data.length))
    }  catch (err) {
        console.error(err);

    }
})
router.get("/followcounter/:name", async (req,res)=>{
    try{
        const name = req.params.name
        await Follow.findAll({
            where: {artistName: name}    
        }).then(data=>res.json(data.length))
    }  catch (err) {
        console.error(err);

    }
})



module.exports = router;

