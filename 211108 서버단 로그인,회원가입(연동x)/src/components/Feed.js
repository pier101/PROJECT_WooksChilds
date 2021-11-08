import React, { useState, useEffect } from "react";
import axios from 'axios';
import TextareaAutosize from '@mui/material/TextareaAutosize'

//feed관련 메인 컴포넌트
const Feed = () => {
    const [content, setContent] = useState("") //const content = ""인 상태
    const [viewContent , setViewContent] = useState([]);

    //게시글 작성시 db에 저장하는 함수
    const PostWrite = async(e) => {
        e.preventDefault();
        const res = await axios.post('/artist/posts',{content});
        if(res.data) {
            alert('데이터를 추가했습니다.');    
            //새로고침시 업데이트 되는걸 새로고침 없이 업데이트 되게 손 봐야됨
        }  
        const axiosData = async ()=>{
            const res = await axios.get('/artist/posts') //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
            console.log(res)
            setViewContent(res.data)
        };
        axiosData();
    }
    
    useEffect(()=>{
        const axiosData = async ()=>{
            const res = await axios.get('/artist/posts') //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
            console.log(res)
            setViewContent(res.data)
        };
        axiosData();
    },[])
    const ChangePostContent = e=> {
        setContent(e.target.value)
    }

    return (
        <div>
            <form method='POST' onSubmit={PostWrite}>
                <TextareaAutosize type="text" value={content} aria-label="empty textarea" placeholder="Empty" onChange={ChangePostContent} style={{ width: 200,height: 150 , }}/>
                {/* <input type='text' maxLength='20' placeholder='noticeContent' onChange={(e) => this.noticeContentCreate(e)}/> */}
                <input type='submit' value='완료' />
                {/* <Post/> */}
                <div>
            {viewContent && viewContent.map(data =>{
                return <p key={data.feedNum} >{data.feedContent}</p>
            })}
        </div>
            </form>
        </div>
    )
}


//추가된 feed 화면상에 나타내는 컴포넌트
// const AddedFeed = () => {
//     const [viewContent , setViewContent] = useState([]);
//     console.log(viewContent)
//     //db에 생성된 게시글 나타내는 함수

//     const a = e=> {
//         const res =  axios.get('/artist/posts') //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
//                 console.log(res)
//                 setViewContent(res.data)
//                 console.log(res.data)
//     }

//     useEffect(()=>{
//             const axiosData = async ()=>{
//                 const res = await axios.get('/artist/posts') //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
//                 console.log(res)
//                 setViewContent(res.data)
//                 console.log(res.data)
//             };
//             axiosData();
//     },[])
//     return (
//         <div>
//             {viewContent && viewContent.map(data =>{
//                 return <p key={data.feedNum} >{data.feedContent}</p>
//             })}
//         </div>
//     )
// }

export default Feed;





