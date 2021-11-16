import React, { useState, useEffect } from "react";
import axios from 'axios';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import {Box} from '@mui/material';

//feed관련 메인 컴포넌트
const Artist = ({match}) => {
    console.log(match)
    const [content, setContent] = useState("") //const content = ""인 상태
    
    const [viewContent , setViewContent] = useState([]);
    const [viewComment , setViewComment] = useState([]);
    const [comment, setComment] = useState("")
    const [isTrue, setIsTrue] = useState(false)

    //게시글 작성시 db에 저장하는 함수
    const PostWrite = async(e) => {
        e.preventDefault();
      await axios.post(`http://localhost:5000/artist/posts/${match.params.name}`,{content,id :sessionStorage.user_id});
        // if(res.data) {
        //     alert('데이터를 추가했습니다.');    
        //     //새로고침시 업데이트 되는걸 새로고침 없이 업데이트 되게 손 봐야됨
        // }  
        const axiosData = async ()=>{
            const res = await axios.get(`http://localhost:5000/artist/posts/${match.params.name}`) //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
            const desc= res.data
                desc.sort((data, nextdata )=> {
                    return nextdata.feedNum - data.feedNum
                })
            setViewContent(res.data)
        };
        axiosData();
    }
    
    //댓글 등록
    const addComment = async(e)=>{
        e.preventDefault();
        const feedNumber = e.target.id
        await axios.post(`http://localhost:5000/artist/comment`,{comment, id :sessionStorage.user_id ,feedNumber : feedNumber, name: match.params.name})
        
        await axios.get(`http://localhost:5000/artist/comment/${match.params.name}`)
        .then(res=>{
            console.log(res.data)
            setViewComment(res.data)
        })
    }
    const handleComment = (e) =>{
        console.log(viewComment)
            setComment(e.target.value)
       
    }
    

    //댓글 수정
    const isTrueHandler = ()=>{
        setIsTrue(true)
    }


    useEffect(()=>{
        const getFeed = async ()=>{
            await axios.get(`http://localhost:5000/artist/posts/${match.params.name}`) //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
            .then(res=>{
                //내림차순 정렬
                const desc= res.data
                desc.sort((data, nextdata )=> {
                    return nextdata.feedNum - data.feedNum
                })
            setViewContent(res.data)
            }).catch(err=>console.log(err))
        };  

        const getComment = async ()=>{
            await axios.get(`http://localhost:5000/artist/comment/${match.params.name}`)
            .then(res=>{
                console.log(res.data)
                setViewComment(res.data)
            })
        }
        getFeed();
        getComment()
    },[])

    const ChangePostContent = e=> {
        setContent(e.target.value)
    }
    
    return (
        <div>
                <Box  sx={{mt: 10}}>
                    <ArtistInfo match={match}/>
                </Box>
                <div>
                    <form method='POST' onSubmit={PostWrite}>
                        <TextareaAutosize type="text" value={content} aria-label="empty textarea" placeholder="Empty" onChange={ChangePostContent} style={{ width: 200,height: 150 , }}/>
                        {/* <input type='text' maxLength='20' placeholder='noticeContent' onChange={(e) => this.noticeContentCreate(e)}/> */}
                        <input type='submit' value='완료' />
                        {/* <Post/> */}
                    <div>
                        <form method="POST">
                        {viewContent && viewContent.map((data) =>{
                            return (
                            <div>                        
                                    
                            <p key={toString(data.feedNum)} >{data.feedContent}</p>
                            <button type="button" >삭제</button>
                            <legend><h6>comment</h6></legend>
                                <ul style={{listStyle:"none"}}>
                                    {viewComment &&viewComment.map(data1 => {
                                        return(
                                            // 해당피드게시물에 관한 댓글 보이게 하기
                                            <li>{data1.feedNum ===data.feedNum && data1.commentContent}</li>
                                        )
                                    })}
                                    <li>
                                        {/* <span id="myId">{db아이디}</span> */}
                                        <textarea  onChange={handleComment} value={comment} id="comment" cols="30" rows="2">{data.feedNum}</textarea>
                                        <input id={Number(data.feedNum)} className="commentcreatebtn" type="button" value="댓글등록" onClick={addComment}/>
                                        <button type='button' onClick={isTrueHandler}>수정</button>
                                    </li>
                                        {/* ##여기 댓글리스트 등록하기 */}
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
   
    const [viewArtistInfo , setArtistInfo] = useState([]);

    useEffect(()=>{
        const artistinfo =async()=> {
            const getartistinfo = await axios.get(`http://localhost:5000/artist/artistinfo/${match.params.name}`)
            setArtistInfo(getartistinfo.data[0])

        }
        artistinfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
    return (
        <div>
            <img src={viewArtistInfo.artistCardImg} alt="" />
           <h2>{viewArtistInfo.artistName}</h2>
        </div>
    )
}



export default Artist;





