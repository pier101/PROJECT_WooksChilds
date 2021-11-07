import React, { useState, useEffect } from "react";
import axios from 'axios';
import TextareaAutosize from '@mui/material/TextareaAutosize'

const Posts = () => {
    const [content, setContent] = useState("") //const content = ""인 상태
    const [viewContent , setViewContent] = useState([]);
    
    //db에 생성된 게시글 나타내는 함수
    useEffect(()=>{
        const axiosData = async ()=>{
            const res = await axios.get('/posts') //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
            console.log(res)
            setViewContent(res.data)
            console.log(res)
        };
        axiosData();
    },[])


    //게시글 작성시 db에 저장하는 함수
    const PostWrite = async(e) => {
        e.preventDefault();

        const res = await axios.post('/posts',{content});
        if(res.data) {
            alert('데이터를 추가했습니다.');    
            return window.location.reload();
            //새로고침시 업데이트 되는걸 새로고침 없이 업데이트 되게 손 봐야됨
        }  
        
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

export default Posts;

//  const Post = async() => {
//      const [viewContent , setViewContent] = useState([]);
//      useEffect(()=>{
//          axios.get('http://localhost:5000/posts').then((res)=>{
//              console.log(res)
//          setViewContent(res.data);
//        })
//      },[viewContent])
//      return (
//          <div>
//             <h1>d</h1>
//              {viewContent.length !== 0 ? viewContent.map((element,index) =>{
//                  return
//              }):null}
//          </div>
//      )
// }

// class Sample extends Component {
//     constructor(props) {
//     super(props);
//     this.state = {
//         noticeContent : ''
//     }
//     };

//     WritePost = async(e) => {
//         const {noticeContent } = this.state;
//         e.preventDefault();

//         const res = await axios('http://localhost:5000/posts', {
//             method : 'POST',
//             data : { 
//             'noticeContent' : noticeContent
//             }
//         });

//         if(res.data) {
//             alert('데이터를 추가했습니다.');
//             return window.location.reload();
//         }
//     }

//     noticeContentWrite(e) {
//     this.setState({ noticeContent : e.target.value })
//     }

//     render() {
//     return(
//         <div>
//             <form method='POST' onSubmit={this.WritePost}>
//                 <TextareaAutosize type="text" aria-label="empty textarea" placeholder="Empty" onChange={(e) => this.noticeContentWrite(e)} style={{ width: 200,height: 150 , }}/>
//                 {/* <input type='text' maxLength='20' placeholder='noticeContent' onChange={(e) => this.noticeContentCreate(e)}/> */}
//                 <input type='submit' value='완료' />
//             </form>
//         </div>
//     )
//     };
// };

// export default Sample;

// import React from 'react'

