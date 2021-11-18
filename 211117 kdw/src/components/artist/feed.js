import React, { useState, useEffect,useRef } from "react";
import axios from 'axios';
import {Box,Divider} from '@mui/material';
import './style.css'
import Loading from './Loader'

const Feed = ({match, isFeed,isArtist}) => {
    const targetRef = useRef(null) 
    const [content, setContent] = useState("") //const content = ""인 상태

    const [viewContent , setViewContent] = useState([]);
    const [viewComment , setViewComment] = useState([]);
    const [viewContentA , setViewContentA] = useState([]);
    const [viewCommentA , setViewCommentA] = useState([]);
    const [comment, setComment] = useState("")
    const [isTrue, setIsTrue] = useState(false)
    const [getUser,setUser] =useState([])
    const [myImage, setMyImage] = useState([]);
    const [target, setTarget] = useState(""); // target
    const [isLoding, setIsLoding] = useState(false); // isloding
    const [initNum, setInitNum]= useState(5)
    const [nextNum, setNextNum]= useState(10)

    const onIntersect = async ([entry], observer) => {
        console.log(entry.isIntersecting)
        if (entry.isIntersecting && !isLoding) {
            
            observer.unobserve(entry.target);
            setIsLoding(true);
            // 데이터를 가져오는 부분
            await new Promise((resolve) => setTimeout(resolve, 1500));
            await axios.get(`http://localhost:5000/artist/posts/${match.params.name}`) //package.json 밑에 (proxy:주소) 넣어주면 경로에 서버주소 안 넣어도 됨
            .then(res=>{
                console.log(res.data)
                let items = [1,2,3,4,5]
                setViewContent((viewContent) => viewContent.concat(items));
                console.log(initNum)
                console.log(nextNum)
                
            }).catch(err=>console.log(err))
            setIsLoding(false);
            setInitNum(initNum+5)
            setNextNum(nextNum+5)
            observer.observe(entry.target);
        }
    };
    
    useEffect(() => {
        let observer;
        if (target) {
            // callback 함수, option
        observer = new IntersectionObserver(onIntersect, {
            threshold: 0.4,
        });
        console.log(observer)
        observer.observe(target); // 타겟 엘리먼트 지정
    }
    return () => observer && observer.disconnect();
    }, [target]);

    const addImage = e =>{
        const nowSelectImageList = e.target.files;
        const nowImageURLList = [...myImage];
        for (let i = 0; i < nowSelectImageList.length; i++) {
            const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
            nowImageURLList.unshift(nowImageUrl);
            
        }
        console.log(nowSelectImageList)
        setMyImage(nowImageURLList)
    }
    //게시글 작성내용 > db에 저장
    const PostWrite = async(e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/artist/posts/${match.params.name}`,{content,id:sessionStorage.user_id})
        .then(res=>{
            if(typeof res.data === "string"){
                return alert(res.data)
            }
            setViewContent(res.data)
        })
    }
    
    //아티스트가 게시글 작성
    const ArtistPostWrite = async(e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/artist/Aposts/${match.params.name}`,{content,id:sessionStorage.user_id,img: myImage})
        .then(res=>{
            if(typeof res.data === "string"){
                return alert(res.data)
            }
            // const descA= res.data
            // console.log(descA)
            // descA.sort((data, nextdata )=> { 
            //     return nextdata.artistFeedNum - data.artistFeedNum
            // })
            console.log('도달')
            setViewContentA(res.data)
            console.log(res.data)
        })
    }


    
    //피드게시물 삭제
    const deleteFeed = async(e)=>{
        const feednum = e.target.id
        await axios.post(`http://localhost:5000/artist/posts/${match.params.name}/delete`,{feednum,id :sessionStorage.user_id})
        .then(res=>setViewContent(res.data))
    }
    const deleteFeedA = async(e)=>{
        const artistfeednum = e.target.id
        await axios.post(`http://localhost:5000/artist/posts/${match.params.name}/deleteA`,{artistfeednum})
        .then(res=>setViewContentA(res.data))
    }
    
    //댓글 등록
    const addComment = async(e)=>{
        e.preventDefault();
        const feedNumber = e.target.id
        await axios.post(`http://localhost:5000/artist/comment`,{comment, id :sessionStorage.user_id ,feedNumber : feedNumber, name: match.params.name})
        .then(res=>console.log(res.data))
        
        await axios.get(`http://localhost:5000/artist/comment/${match.params.name}`)
        .then(res=>{
            setViewComment(res.data)
        })
    }
    //아티스트 피드 댓글 등록
    const addArtistComment = async(e)=>{
        e.preventDefault();
        const artistFeedNumber = e.target.id
        await axios.post(`http://localhost:5000/artist/comment/artistfeed`,{comment, id :sessionStorage.user_id ,artistFeedNumber : artistFeedNumber, name: match.params.name})
        .then(res=>console.log(res.data))
        
        await axios.get(`http://localhost:5000/artist/comment/artistfeed/${match.params.name}`)
        .then(res=>{
            console.log(res.data)
            setViewCommentA(res.data)
        })
    }


    //댓글창 내용
    const handleComment = (e) =>{
        setComment(e.target.value)   
    }
    //댓글 삭제
    const deleteOn = async(e)=>{
        const num = e.target.id
        await axios.post(`http://localhost:5000/artist/comment/${match.params.name}/delete`,{ num : num }).then(res=>{
            console.log(res.data)    
            setViewComment(res.data)
        })
    }
    const deleteOnA = async(e)=>{
        const num = e.target.id
        await axios.post(`http://localhost:5000/artist/comment/${match.params.name}/delete`,{ num : num }).then(res=>{
            console.log(res.data)    
            setViewCommentA(res.data)
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
            const num = e.target.id;
            setIsTrue(!isTrue);
            await axios.post(`http://localhost:5000/artist/comment/${match.params.name}/edit`,{comment, num : num }).then(res=>{
                    setViewComment(res.data)
        })
        }
    }
    const handleKeyDownA = async(e) => {
        if (e.key === "Enter") {
            const num = e.target.id;
            setIsTrue(!isTrue);
            await axios.post(`http://localhost:5000/artist/comment/${match.params.name}/edit`,{comment, num : num }).then(res=>{
                    setViewCommentA(res.data)
        })
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
            setViewContent(res.data.slice(0,5))
            }).catch(err=>console.log(err))
        };  

        const getComment = async ()=>{
            await axios.get(`http://localhost:5000/artist/comment/${match.params.name}`)
            .then(res=>{
                console.log(res.data)
                setViewComment(res.data)
                console.log(viewContent)
            })
        }
        const getArtistComment = async ()=>{
            await axios.get(`http://localhost:5000/artist/comment/artistfeed/${match.params.name}`)
            .then(res=>{
                setViewCommentA(res.data)
        })
        }

        const getUser = async ()=>{
            await axios.get(`http://localhost:5000/mypage/${sessionStorage.user_id}`).then(res=>setUser(res.data))
        }
        
        const getArtistContent = async()=>{
            await axios.get(`http://localhost:5000/artist/Aposts/${match.params.name}`)
            .then(res=>{
            setViewContentA(res.data)
        }).catch(err=>console.log(err))}
        getFeed();
        getComment();
        getUser();
        getArtistContent();
        getArtistComment()

    },[]);
    


    
    if (isFeed) {
        return (
            <div className="artistBox">
                    <Box>
                    </Box>
    
                    <div>
                        <form method='POST' onSubmit={PostWrite}>
                            <div className="feed-input-box">
                                <h5>소통해보아요😉</h5>
                                <textarea className="textarea" type="text" value={content} aria-label="empty textarea" placeholder="메세지를 입력해주세요" onChange={ChangePostContent} style={{ width: 550,height: 150 }}/>
                                <input type='submit' value='피드 생성하기' style={{border:"none" }} />
                            </div>
                            
                        <div>
                            <form method="POST">
                            {viewContent && viewContent.map((data, index) =>{
                                return (
                                <div className='feed' number={index+1} key={index}>
                                    <div className="feeder">
                                        <div>
                                            <img src={getUser.userImg} alt="유저이미지" />
                                            <span>{data.userId}</span>
                                        </div>
                                        {getUser.userId ===data.userId &&
                                        <div>
                                            <button id={data.feedNum} type="button" onClick={deleteFeed}>삭제</button>
                                        </div>}
                                    </div>
                                    <div className='feed-content'>
                                        <p key={toString(data.feedNum)} >{data.feedContent}</p>
                                        <p className="date">{new Date(data.feedCreated).toLocaleString()}</p>
                                    </div>      
                                    <Divider sx={{m:1,mx:0}}/>              
                                    <legend><h6>comment</h6></legend>
                                    <ul style={{listStyle:"none"}}>
                                        {viewComment &&viewComment.map(data1 => {
                                            if (data1.feedNum === data.feedNum) {
                                                return(
                                                    // 유저게시물에 내 댓글들
                                        
                                        <div key={data1.commentNum}>
                                            <li className="comment-content">
                                                <div  className='id'>
                                                    <div>
                                                    {data1.userId} 
                                                    </div>
                                                    <span>{data1.commentContent}</span>
                                                </div>
                                                {getUser.userId ===data1.userId &&
                                                <div className='button'>
                                                    <button type="button" onClick={() => editOn()}>수정</button>
                                                    <button id={data1.commentNum} type="button" onClick={(e)=>deleteOn(e)}>삭제</button>
                                                </div>
                                                }
                                            </li>
                                            {isTrue && <input id={data1.commentNum} type="text" size="40"  onChange={(e) => handleEidtComment(e)} onKeyDown={handleKeyDown}/>}
                                        </div >
                                                )
                                            }
                                        })}
                                        <li>
                                            {/* <span id="myId">{db아이디}</span> */}
                                            <textarea style={{marginTop:10}} onChange={handleComment}  id="comment" cols="52" rows="2"></textarea>
                                            <input id={Number(data.feedNum)} className="commentcreatebtn" type="button" value="댓글등록" onClick={addComment}/>
                                        </li>
                                    </ul>
                                </div>
                                )
                            })}
                            </form>
                        </div>      
                            {isLoding ? (
                                <Loading/>
                            ) : ("")}
                            <div ref={setTarget}></div>
                            
                        </form>
                    </div>
                </div>
            )
    } else if (isArtist){
        return (
            <div className="artistBox">
                    <Box>
                    </Box>
    
                    <div>
                        <form method='POST' onSubmit={ArtistPostWrite}>
                            <div className="feed-input-box-art">
                                <h5>CL님의 공간</h5>
                                <textarea className="textarea-art" type="text" value={content} aria-label="empty textarea" placeholder="메세지를 입력해주세요" onChange={ChangePostContent} style={{ width: 550,height: 150 }}/>
                                <label htmlFor="input-file" className="OOTDwrite-input-file" onChange={addImage}>
                                    <div>addaddd</div>
                                    <input type="file" mulitple="multiple" id="input-file" style={{display:"none"}} accept=".jpg,.jpeg,.png" />
                                </label>
                                <input type='submit' value='피드 생성하기' style={{border:"none" }} />
                            
                            </div>
                            
                        <div>
                            <form method="POST">
                            {viewContentA && viewContentA.map((data) =>{
                                return (

                                <div className='feed' ref={targetRef}>
                                    <div className="feeder">
                                        <div>
                                            <img src={getUser.userImg} alt="유저이미지" />
                                            <span>{data.userId}</span>
                                        </div>
                                        {getUser.userId ===data.userId &&
                                        <div>
                                            <button id={data.artistFeedNum} type="button" onClick={deleteFeedA}>삭제</button>
                                        </div>}
                                    </div> 
                                    {data.artistfeedImg &&  <img src={data.artistfeedImg} alt="d" />}
                                    
                                    <div className='feed-content'>
                                        <p key={toString(data.artistFeedNum)} >{data.artistfeedContent}</p>
                                        <p className="date">{new Date(data.artistfeedCreated).toLocaleString()}</p>
                                    </div>      
                                    <Divider sx={{m:1,mx:0}}/>              
                                    <legend><h6>comment</h6></legend>
                                    <ul style={{listStyle:"none"}}>
                                        {viewCommentA &&viewCommentA.map(data1 => {
                                            if (data1.artistFeedNum === data.artistFeedNum) {
                                                return(
                                                    // 유저게시물에 내 댓글들
                                        
                                        <div key={data1.commentNum}>

                                            <li className="comment-content">
                                                <div  className='id'>
                                                    <div>
                                                    {data1.userId} 

                                                    </div>
                                                    <span>{data1.commentContent}</span>
                                                </div>
                                                <div style={{fontSize:13,float:"right"}}>{new Date(data1.commentCreated).toLocaleDateString()}</div>
                                                {getUser.userId ===data1.userId &&
                                                <div className='button'>
                                                    <button type="button" onClick={() => editOn()}>수정</button>
                                                    <button id={data1.commentNum} type="button" onClick={(e)=>deleteOnA(e)}>삭제</button>
                                                </div>}
                                            </li>
                                            {isTrue && <input id={data1.commentNum} type="text" size="40"  onChange={(e) => handleEidtComment(e)} onKeyDown={handleKeyDownA}/>}
                                        </div >
                                                )
                                            }
                                        })}
                                        <li>
                                            <textarea style={{marginTop:10}} onChange={handleComment}  id="comment" cols="52" rows="2"></textarea>
                                            <input id={Number(data.artistFeedNum)} className="commentcreatebtn" type="button" value="댓글등록" onClick={addArtistComment}/>
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

    }

    export default Feed;