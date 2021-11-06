import React, { useState,useEffect } from "react";
import axios from 'axios';
import TextareaAutosize from '@mui/material/TextareaAutosize'

const Post = () => {
    const [content, setContent] = useState("") //const content = ""인 상태
    const [box, setBox] = useState([]) //const content = ""인 상태
    
    const PostWrite = async(e) => {
        e.preventDefault();
    
        const res = await axios.post('/posts',
         {content,});
         console.log(res)
        if(res.data) {
            // alert('데이터를 추가했습니다.');    
            // return window.location.reload();
        }
    }
    const 가져오기 = ()=>{

       // server와 통신하기 위해 useEffect 라는 훅을 사용한다.
        axios.get('post')  
        .then(req => setBox(req.data));
        console.log(box)

    
    }

    const ChangePostContent = e=> {
        setContent(e.target.value)
    }
    


    return (
        <div>
            <form method='POST' onSubmit={PostWrite}>
                <TextareaAutosize type="text" value={content} aria-label="empty textarea" placeholder="Empty" onChange={ChangePostContent} style={{ width: 200,height: 150 , }}/>
                {/* <input type='text' maxLength='20' placeholder='noticeContent' onChange={(e) => this.noticeContentCreate(e)}/> */}
                <input type='submit' value='완료' />
            </form>
                
                <button type='submit' onClick={가져오기}>가져오기</button>
                { box.map((a)=>{
                    return(
                    <ul>{a.noticeContent}</ul>
                    )}) }
               

        </div>
    )
}

export default Post