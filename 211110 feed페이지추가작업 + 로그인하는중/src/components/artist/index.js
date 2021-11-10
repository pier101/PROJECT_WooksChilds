import React, { useState, useEffect } from "react";
import axios from 'axios';
import TextareaAutosize from '@mui/material/TextareaAutosize'

//feed관련 메인 컴포넌트
const Artist = ({match},props) => {
    console.log(match)
    const isLogin = props.isLogin
    const [content, setContent] = useState("") //const content = ""인 상태
    
    const [viewContent , setViewContent] = useState([]);

    //게시글 작성시 db에 저장하는 함수
    const PostWrite = async(e) => {
        e.preventDefault();
        const res = await axios.post(`/artist/posts/${match.params.name}`,{content});
        if(res.data) {
            alert('데이터를 추가했습니다.');    
            //새로고침시 업데이트 되는걸 새로고침 없이 업데이트 되게 손 봐야됨
        }  
        const axiosData = async ()=>{
            const res = await axios.get(`/artist/posts/${match.params.name}`) //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
            console.log(res)
            setViewContent(res.data)
        };
        axiosData();
    }
    
    useEffect(()=>{
        const axiosData = async ()=>{
            const res = await axios.  get(`/artist/posts/${match.params.name}`) //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
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
                <div>
                    <ArtistInfo match={match}/>
                </div>
                <div>
                    <form method='POST' onSubmit={PostWrite}>
                        <TextareaAutosize type="text" value={content} aria-label="empty textarea" placeholder="Empty" onChange={ChangePostContent} style={{ width: 200,height: 150 , }}/>
                        {/* <input type='text' maxLength='20' placeholder='noticeContent' onChange={(e) => this.noticeContentCreate(e)}/> */}
                        <input type='submit' value='완료' />
                        {/* <Post/> */}
                    <div>
                        <form method="POST">
                        {viewContent && viewContent.map(data =>{
                            return (
                            <div>                        
                                    
                            <p key={data.feedNum} >{data.feedContent}</p>
                            <legend><h6>comment</h6></legend>
                                <ul style={{listStyle:"none"}}>
                                    <li>
                                        {/* <span id="myId">{db아이디}</span> */}
                                        <textarea id="comment" cols="30" rows="2"></textarea>
                                        <input className="commentcreatebtn" type="submit" value="댓글등록" />
                                    </li>
                                    <li>
                                        {/* ##여기 댓글리스트 등록하기 */}
                                    </li>
                                </ul>
                            </div>
                            )
                        })}
                        </form>
                    </div>      
                    </form>
                </div>
            </div>
        )

    }

const ArtistInfo = ({match}) => {
    console.log(match)
    console.log(match.params)
    const [viewArtistInfo , setArtistInfo] = useState([]);

    useEffect(()=>{
        const artistinfo =async()=> {
            const getartistinfo = await axios.get(`/artist/artistinfo/${match.params.name}`)
            console.log(getartistinfo)
            setArtistInfo(getartistinfo.data[0])
            console.log(viewArtistInfo)
        }
        artistinfo();
        },[])
    return (
        <div>
            <img src={viewArtistInfo.artistCardImg} alt="" />
           <h2>{viewArtistInfo.artistName}</h2>
        </div>
    )
}

// const userInfo = () => {
//     return (
//         <div>
            
//         </div>
//     )
// }
// const menu = () => {
//     return (
//         <div>
            
//         </div>
//     )
// }

export default Artist;





