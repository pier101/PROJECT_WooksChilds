import React,{useEffect, useState} from 'react'
import {Avatar,Divider,Box,CssBaseline,Button,TextField } from '@mui/material';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import {useHistory} from 'react-router';
// import Example from '../scroll.js/ex'



export default function Profile() {

  // const [loading, setLoading] = useState(true); // 로딩중인지 아닌지를 담기위한 state
  // const [instaData, setInstaData] = useState([]); // API로부터 받아온 내 피드 데이터를 배열에 저장
  // const [instaPaging, setInstaPaging] = useState<IPagingData>({ next: undefined }); // API로부터 받아온 다음 페이지 데이터를 저장


  //------------------------------------------------------------------------
    let[유저정보,set유저정보]= useState(
        {userId:'cjftns',userPwd:123,userName:'철순',userTel:'01025571351',userMail:'cjftns013@naver.com',userAddr:'천호천호야야',
        level:1,userCreated:'뭐지?',provider:'뭘라',snsID:'없음',userImg:'https://i.ytimg.com/vi/HrjyYB2jXLo/maxresdefault.jpg',});

    let[내구릅,set내구릅] = useState([
      {name:"CL",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
      {name:"WINNER",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/png/122262f1689046e7b47f568a3f5c1765066.png"},
      {name:"BLACKPINK",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/png/9748dae239044e65835bd894768beebe971.png"},
      {name:"FTILAND",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/png/0d1c0a2d47b24cbe88d3e37ef41e1048379.png"},
      {name:"GFRIEND",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/png/12529b280a424913b549ac2f73f00d28081.png"},
      {name:"cl",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
      {name:"cl",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
      {name:"cl",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
      {name:"cl",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
    ]);
    let[구짜,set구짜] = useState([
      {goodsName:'내가제일잘나가빽',goodsPrice:"500,000,000",goodsImg:"https://cdn-contents.weverse.io/admin/xlx2048/png/f59ff76e6908409ea9bb7e4f162c7615633.png"},
      {goodsName:'내가제일 못 나가빽',goodsPrice:"5",goodsImg:"https://cdn-contents.weverse.io/admin/xlx2048/png/f59ff76e6908409ea9bb7e4f162c7615633.png"},
      {goodsName:'썬미썬미야야',goodsPrice:"5",goodsImg:"https://cdn-contents.weverse.io/admin/xlx2048/png/f59ff76e6908409ea9bb7e4f162c7615633.png"},
    ]);

    let [개시팔,set개시판] = useState([
      {commentContent:'',artistID:"CL",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
    ])

    const [getUser,setUser] =useState([])
    const [getFeed,setFeed] =useState([])
    const [getWish,setWish] =useState([])
    const [getFollow,setFollow] =useState([])
    const history = useHistory()
    //로그아웃
    const Logout = async()=>{
      sessionStorage.removeItem('user_id')
      sessionStorage.clear();
      // history.push('/login')
      document.location.href = '/login'
    }


      useEffect(()=>{
        const getData = async()=>{
          await axios.get(`http://localhost:5000/mypage/${sessionStorage.user_id}`)
          .then(res=>{
            console.log(res.data)
            setUser(res.data)
          }).catch(err=>console.log(err))
        }
        const FeedData = async()=>{
          await axios.get(`http://localhost:5000/mypage/feed/${sessionStorage.user_id}`)
          .then(res=>{
            console.log(res.data)
            setFeed(res.data)
          }).catch(err=>console.log(err))
        }

        //찜목록 
        const wishData = async()=>{
          console.log(sessionStorage.user_id)
          await axios.get(`http://localhost:5000/goods/wishlist/${sessionStorage.user_id}`).then(res=>{
            setWish(res.data)
          }).catch(err=>console.error(err))
        }

        const followList = async()=>{
          console.log(sessionStorage.user_id)
          await axios.get(`http://localhost:5000/mypage/followlist/${sessionStorage.user_id}`).then(res=>{
            setFollow(res.data)
          }).catch(err=>console.error(err))
        }

        getData();
        FeedData();
        followList()
        wishData();
      },[])

        return (
            <>
          
        <Box sx={{mt:10,mx:'15%', minWidth:'300px', maxWidth:'70%', display: 'flex',borderColor:'grey.500',  flexWrap: 'nowrap',justifyContent: 'space-between'   }}>
          <Box sx={{textAlign: 'center',mt:5,ml:2,display: 'flex' }}>
          
            <Avatar
            alt="Remy Sharp"
            src={getUser.userImg} 
            sx={{ mb:5, width: 200, height: 200, textAlign: 'center'  }}
            />
          
          <Box sx={{mt:2,ml:2,display: 'flex' }}><h1><b>{getUser.userName}</b></h1><Box sx={{textAlign: 'right',mt:3}}>님 안녕하세요</Box></Box></Box>
          <Button sx={{mt:10, width: 200, height: 80, textAlign: 'center'}}flex='1' variant="outlined" color="error" onClick={Logout} >        로그아웃      </Button>
        </Box>

        <Divider sx={{m:2,mx:0}}/>      {/* 구분선 */}

        

        {/* 개시글 빠끄빠 */}
        <React.Fragment>
      <CssBaseline />
        <Box sx={{  mx:'15%', display: 'flex',flexWrap: 'nowrap', height: '100vh' }} >
          <Box sx={{ mt:3,mr:7,  height: '20vh' ,flex:'70%', maxWidth: 900,}} >
          <Box sx={{  width:'100%',  }} >
          {/* <div>{getWish.Good.goodsNum}</div> */}
          {getFeed && getFeed.map((data,i)=>{
            return(
            <Box sx={{cursor:'pointer'}} onClick={()=>{console.log('경로 ㄱㄱ')}}>
            <Box sx={{ mt:7,ml:3, display: 'flex' }}>
            <Avatar key={i+1}  alt="Remy Sharp" src={getUser.userImg} sx={{  width: 25, height: 25}}/>
              <Box key={data.feedNum} sx={{ textAlign: 'center',fontWeight: 'light',  ml:1  }}>{getUser.userName}<ArrowRightRoundedIcon sx={{}}/>{data.artistName}</Box>
              </Box>
              <TextField sx={{width:'95%',mx:3,mt:2,cursor:'pointer' }}
                  id="standard-textarea"
                  key={data.feedNum}
                  defaultValue={data.feedContent}
                  multiline
                  variant="standard"
                    />
            </Box>
            )})}
          </Box>
          </Box>
          {/* <Box>
            <Example/>
          </Box> */}

          {/* 콘테이너 왼쪽 줄 */}
          <Box sx={{  mt:5,display: 'flex',flex:'30%',maxWidth: 470, alignItems: 'flex-start', flexDirection: 'column'}} >
            

            
            {/* 가입된 아리스트 */}
            <Box sx={{  width:'100%', borderRadius:2, border: 1, borderColor:'#ddd',bgcolor: 'background.paper', }} >
              <Box sx={{ mt:2,ml:5, fontWeight: 'medium',fontSize: 'h6.fontSize' }}> 팔로우리스트 </Box>
              { getFollow.map((follow, i)=>{
                return(
                <Box>
                <Box sx={{ mt:2,mx:4, display: 'flex', }}>
                <Avatar
                  alt="Remy Sharp"
                  src={follow.ArtistCard.artistCardImg}
                  sx={{  width: 50, height: 50, textAlign: 'center',  }}
                  />
                    <Box key={i+1} sx={{ mx:4,fontWeight: 'medium',fontSize: 'h6.fontSize',mt:1,justifyContent: 'space-between',width:'70%' }}>{follow.artistName}</Box>
                    <ClearIcon sx={{  mt:1, width: 30, height: 30, textAlign: 'center',cursor:'pointer' }} onClick={()=>{console.log('내아티스트삭제요청 ㄱ')}}/>
                    
                  </Box>
                   <Divider sx={{mx:3,mt:2,}}/></Box>
                 )})}
              </Box>

            {/* 구짜  */}
            <Box sx={{ mt:7, width:'100%', borderRadius:2, border: 1, borderColor:'#ddd',bgcolor: 'background.paper', }} >
              <Box sx={{ mt:2,ml:5, fontWeight: 'medium',fontSize: 'h6.fontSize' }}> 찜한 상품 </Box>
              {getWish && getWish.map(wish=>(
                <Box>
                <Box sx={{ mt:2,mx:4, display: 'flex' }}>
                {/* <Avatar
                  alt="Remy Sharp"
                  src={wish.goodsImg}
                  variant="rounded"
                  sx={{  width: 50, height: 50, textAlign: 'center', }}
                  /> */}
                  <Box  sx={{mx:4, fontWeight:'medium',justifyContent: 'space-between',width:'70%' }}>{wish.Good.goodsName}
                        <p style={{fontSize:13}}><del>W</del>&nbsp;{wish.Good.goodsPrice}</p> 
                 </Box>
                  <ClearIcon sx={{  mt:1, width: 30, height: 30, textAlign: 'center',cursor:'pointer' }} onClick={()=>{console.log('구쯔삭제요청 ㄱ')}} />
                  </Box>
                   <Divider sx={{mx:3,mt:1,}}/></Box>
              )
                )}) 
              </Box>

          
          
          
          
          
          
          
          
          
          
          
          {/* 콘테이너 왼쪽줄 */}
          </Box>
      {/*콘테이너 총합친거 2개  */}
        </Box>
      </React.Fragment>
    
        </>
    )
}
