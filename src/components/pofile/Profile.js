import React,{useState} from 'react'

export default function Profile() {
    let[유저정보,set유저정보]= useState(
        {userId:'cjftns',userPwd:123,userName:'철순',userTel:'01025571351',userMail:'cjftns013@naver.com',userAddr:'천호천호야야',
        level:1,userCreated:'뭐지?',provider:'뭘라',snsID:'없음'}
       
    )
    return (
        <div>
            <h1>{유저정보.userName} 반갑습니다.</h1>
            <h1>{유저정보.userId} </h1>
        </div>
    )
}
