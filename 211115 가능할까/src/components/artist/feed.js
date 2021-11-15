import React, { useState, useEffect } from "react";
import axios from 'axios';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import {Box} from '@mui/material';
import './style.css'

const Feed = ({match, isFeed,isArtist}) => {

    console.log(isFeed)
    const [content, setContent] = useState("") //const content = ""인 상태

    const [viewContent , setViewContent] = useState([]);
    const [viewComment , setViewComment] = useState([]);
    const [comment, setComment] = useState("")
    const [isTrue, setIsTrue] = useState(false)

    //게시글 작성내용 > db에 저장
    const PostWrite = async(e) => {
        e.preventDefault();
      await axios.post(`http://localhost:5000/artist/posts/${match.params.name}`,{content,id:sessionStorage.user_id});

        const axiosData = async ()=>{
            const res = await axios.get(`http://localhost:5000/artist/posts/${match.params.name}`) 
            //내림차순 정렬 - desc
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
        .then(res=>console.log(res.data))
        
        await axios.get(`http://localhost:5000/artist/comment/${match.params.name}`)
        .then(res=>{
            console.log(res.data)
            setViewComment(res.data)
        })
    }
    //댓글창 내용
    const handleComment = (e) =>{
        setComment(e.target.value)   
    }
    //댓글 삭삭제
    const deleteOn = async(e)=>{
        const num = e.target.id
        await axios.post(`http://localhost:5000/artist/comment/${match.params.name}/delete`,{ num : num }).then(res=>{
            console.log(res.data)    
            setViewComment(res.data)
        })

        
    }

    //edit 댓글창 생성
    const editOn = () => {
        setIsTrue(true);
      };
    //edit 댓글창 내용
    const handleEidtComment = (e) =>{
        setComment(e.target.value)   
    }
    //edit 댓글 수정하기
    const handleKeyDown = async(e) => {
        if (e.key === "Enter") {
            // console.log(Number(comment.commentNum))
            
            const num = e.target.id;
            setIsTrue(!isTrue);
            await axios.post(`http://localhost:5000/artist/comment/${match.params.name}/edit`,{comment, num : num }).then(res=>setViewComment(res.data))
            
        }
    }

    //피드 내용
    const ChangePostContent = e=> {
        setContent(e.target.value)
    }

    


    //첫 렌더링 화면 설정
    useEffect(()=>{
        console.log('useEffect')
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
        getComment();
  
    },[]);


    
    if (isFeed) {
        return (
            <div className="artistBox">
                    <Box>
                        <Box position="fixed">
                        {/* <ArtistInfo  match={match}/> */}
                        </Box>
                    </Box>
    
                    <div>
                        <form method='POST' onSubmit={PostWrite}>
                            <div className="feed-input-box">
                                <TextareaAutosize className="textarea" type="text" value={content} aria-label="empty textarea" placeholder="Empty" onChange={ChangePostContent} style={{ width: 200,height: 150 , }}/>
                                <input type='submit' value='완료' />
                            </div>
                            
                        <div>
                            <form method="POST">
                            {viewContent && viewContent.map((data) =>{
                                return (

                                <div className='feed'>                        
                                <p key={toString(data.feedNum)} >{data.feedContent}</p>
                                <button type="button" >삭제</button>
                                <legend><h6>comment</h6></legend>
                                    <ul style={{listStyle:"none"}}>
                                        {viewComment &&viewComment.map(data1 => {
                                            if (data1.feedNum === data.feedNum) {
                                                return(
                                                    // 유저게시물에 내 댓글들
                                                    <div key={data1.commentNum}>
                                                        <li>{data1.commentContent}</li>
                                                        
                                                        <button type="button" onClick={() => editOn()}>수정</button>
                                                        <button id={data1.commentNum} type="button" onClick={(e)=>deleteOn(e)}>삭제</button>
                                                        {isTrue && <input id={data1.commentNum} type="text"  onChange={(e) => handleEidtComment(e)} onKeyDown={handleKeyDown}/>}
                                                    </div >
                                                )
                                            }
                                        })}
                                        <li>
                                            {/* <span id="myId">{db아이디}</span> */}
                                            <textarea  onChange={handleComment}  id="comment" cols="30" rows="2"></textarea>
                                            <input id={Number(data.feedNum)} className="commentcreatebtn" type="button" value="댓글등록" onClick={addComment}/>
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
    } else if (isArtist){
        return(
            <h1>되어라</h1>
        )
    }

    }

    export default Feed;