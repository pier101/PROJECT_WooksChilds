const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
// const Admin = require("../models/admin");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const multer = require('multer');
const storage  = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './')},
    filename: function (req,file,cb) {
        const ext = file.mimetype.split('/')[1];
        cb(null,`uploads/${file.originalname}-${Date.now()}.${ext}`)
    }
})
const upload = multer ({
    storage: storage
})

const router = express.Router();

//여기서부터 user
router.post("/signup", async (req, res, next) => {
    const { id,pw2,name, email,tel,addr,addr2} = req.body;
    try {
        const isUserId = await User.findOne({ where: { userId: id } });
        const isUserMail = await User.findOne({ where: { userMail: email } });

        if (isUserId) {
            console.log('가입된 id가 있습니다.')
            return res.send("id존재")
        } else if(isUserMail) {
            console.log('가입된 email이 있습니다.')
            return res.send("email존재");
        } else{
            const hash = await bcrypt.hash(pw2, 12);
            await User.create({
                userId: id,
                userPwd: hash,
                userName: name,
                userMail: email,
                userTel: tel,
                userAddr: `${addr} ${addr2}`,
            });
            return res.send(true)
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/users/login', async(req, res) => {
const id = req.body.id
console.log(id)
// console.log('ping')
//요청된 이메일을 데이터베이스에서 있는지 찾는다.
const a = await User.findAll({where:{ userId: id }})
    console.log(a.User)

 await User.findAll({where:{ userId: id }}, (err, user) => {
    console.log(user)
    // console.log('user', user)
    if (!user) {
    return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
    })
    }

    //비밀번호 까지 맞다면 토큰을 생성하기.
    user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);  

        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
    })
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    // user.comparePassword(req.body.password, (err, isMatch) => {
    // // console.log('err',err)

    // // console.log('isMatch',isMatch)

    // if (!isMatch)
    //     return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

    // })
})
})

router.get('/logintest', (req, res) => {
    res.send({data: 'data'})
});
router.post('/logintest', async(req, res) => {
    const inputId =req.body.id
    const inputPw =req.body.pw
    const hash = await bcrypt.hash(inputPw, 12);
    console.log(hash)
    console.log(inputId)
    const userInfo = await User.findOne({where:{userId : inputId}})
    console.log(userInfo)
    const compare = await bcrypt.compare(inputPw,userInfo.userPwd)
    console.log(compare)
    if(compare=== true){
        console.log('성공')
        res.send(userInfo)
    } else{
        console.log('실패')
        res.send(false)
    }


});
router.post('/logintest', async(req, res) => {
    const inputId =req.body.id
    const inputPw =req.body.pw
    // const hash = await bcrypt.hash(inputPw, 12);
    // console.log(hash)
    // console.log(inputId)
    const userInfo = await User.findOne({where:{userId : inputId}})

    res.send(userInfo)

    console.log(userInfo)
    const compare = await bcrypt.compare(inputPw,userInfo.userPwd)
    console.log(compare)
    if(compare=== true){
        console.log('성공')
        res.send(userInfo)
    } else{
        console.log('실패')
        res.send(false)
    }


});
// router.post("/login", (req, res, next) => {
//     console.log(req.body.id)
//     res.send({data:"data"})
//     // passport.authenticate("local", (authError, user, info) => {
//     //     if (authError) {
//     //         console.error(authError);
//     //         return next(authError);
//     //     }
//     //     if (!user) {
//     //         //비회원 또는 비밀번호 불일치시 alert창 띄우고 로그인페이지 다시 불러오기
//     //         res.writeHead(302, { "Content-Type": "text/html; charset=utf8" });
//     //         res.write(`<script>alert('${info.message}')</script>`);
//     //         return res.write('<script>window.location="../login"</script>'); //res.redirect(`/login`);
//     //     }
//     //     return req.login(user, (loginError) => {
//     //         if (loginError) {
//     //             console.error(loginError);
//     //             return next(loginError);
//     //         }
//     //         return res.redirect("/");
//     //     });
//     // })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
// });
// //

//여기서 부터 admin
router.post("/admin", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local", (authError, admin, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!admin) {
            res.writeHead(302, { "Content-Type": "text/html; charset=utf8" });
            res.write(`<script>alert('${info.message}')</script>`);
            return res.write('<script>window.location="../admin"</script>'); //res.redirect(`/login`);
        }
        return req.login(admin, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/notice");
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.post("/findpwd", isNotLoggedIn, async (req, res, next) => {
    const { usermail } = req.body;
    try {
        const user = await User.findOne({
            // 1. 유저가 존재하면 유저 정보를 가져옴
            where: { userMail: usermail },
        });
        console.log(user)
        //console.log(user);
        if (user) {
            // 2. 유저가 있다면?
            let arr =
                "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,!,@,#,$,%,&;".split(
                    ","
                );
                let newpwd = createCode(arr, 10);
                console.log(createCode(arr, 10));
                function createCode(objArr, iLength) {
                    let arr = objArr;
                    let randomStr = "";
                    for (let i = 0; i < iLength; i++) {
                    randomStr += arr[Math.floor(Math.random() * arr.length)];
                    }
                    return randomStr;
                }
                
            //임시비밀번호 생성 함수
        
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    // 이메일을 보낼 계정 데이터 입력
                    user: process.env.USERMAIL,
                    pass: process.env.USERPASS,
                    // .env에 따로 관리해야함
                },
            });

            const mailOptions = {
                from: process.env.USERMAIL, // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
                to: usermail, // 수신 메일 주소
                subject: "[위버스]임시 비밀변호 발급", // 제목
                 // 내용
                html:
                `<p>비밀번호 분실 요청으로 임시비밀번호 발급드립니다.</p>`+
                    `<p>홈페이지에서 아래 임시비밀 번호로 로그인후 가급적이면 비밀번호를 변경해주세요.<p>` +
                    "<p>" +
                    '임시비밀번호 : '+
                    newpwd +
                    "</p>",
            };
            const hash = await bcrypt.hash(newpwd, 12);
            await User.update(
                {
                    userPwd:hash
                },
                {where:{userMail:usermail}
            })

            try {
                await transporter.verify();
                await transporter.sendMail(mailOptions);
                console.log("Email sent success!!!!");
                return res.redirect("/login");
            } catch (err) {
                console.error(err);
            }
        } //if절끝남

    } catch (e) {
        // try에서 result 결과값이 null일때 catch에서 에러로 잡지 않음 이유는?..
        console.error(e);
        next(e)
    }
});


router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
});


router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
    }),
    (req, res) => {
        res.redirect(`/`);
    }
);

router.get("/kakao", passport.authenticate("kakao"));

router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    (req, res) => {
        res.redirect(`/`);
    }
);






module.exports = router;