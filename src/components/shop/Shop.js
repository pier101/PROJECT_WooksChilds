import React from 'react'
import {Box,Avatar,Checkbox} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {Carousel} from 'react-bootstrap'
import { Link } from 'react-router-dom';


import { pink } from '@mui/material/colors';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
// https://weverseshop.io/images/mockup-1@3x.f104bfaaf1616a890572339c59a22184.png
// https://weverseshop.io/images/mockup-3@3x.2776bd6edddab582d48095db591a427a.png
export default function Shop() {
    return (
        <div>
           
                <Box sx={{}}>
                    <Box sx={{ pt:'10%',fontWeight: 'bold',textAlign: 'center',color:'#06e19a',fontSize:100, }}>GOOODS SHOP</Box>
                        <Box sx={{ bgcolor:'#06e19a',fontWeight: 'bold',textAlign: 'center',color:'#06e19a', }}>
                            <Box sx={{mx:'10%'}}>
                        
                        <Carousel fade>
                            <Carousel.Item  style={{ height: '600px'}} onClick={()=>{console.log('경로설정')}}>
                                <Carousel.Caption >
                                    <Box sx={{ml:8, textAlign:'center',color:'white',fontSize:50,display:'flex' }}> 
                                        <Box sx={{textAlign: 'center',mr:10 }} >
                                        <img
                                        style={{ height: '500px'}}
                                        src='https://weverseshop.io/images/mockup-3@3x.2776bd6edddab582d48095db591a427a.png'
                                        /> </Box>
                                        구쯔<br/>맛집에 오신걸 환영합니다.
                                    </Box>
                                </Carousel.Caption>
                            </Carousel.Item> 

                            <Carousel.Item  style={{ height: '600px'}} onClick={()=>{console.log('경로설정')}}>
                                <Carousel.Caption >
                                    <Box sx={{ml:8, textAlign:'center',color:'white',fontSize:50,display:'flex' }}> 
                                            <br/><br/><br/>여기가 다른데보다 전나싸여<br/>다른데 절대가지마요
                                        <Box sx={{textAlign: 'center',ml:10 }} >
                                        <img
                                        style={{height: '500px'}}
                                        src='https://weverseshop.io/images/mockup-1@3x.f104bfaaf1616a890572339c59a22184.png'
                                        /></Box>
                                    </Box>
                                </Carousel.Caption>
                            </Carousel.Item> 

                            <Carousel.Item  style={{ height: '600px'}} onClick={()=>{console.log('경로설정')}}>
                                <Carousel.Caption >
                                    <Box sx={{ml:8,mb:25, textAlign:'center',color:'white',}}> 
                                    <h1 >80%~90% Season Off</h1>
                                        <h3>전품목 시즌오프~!! </h3> <h3> 드루와 드루와 </h3>
                                        <p> This is a simple hero unit, a simple jumbotron-style component for calling
                                            extra attention to featured content or information.</p>
                                        </Box>
                                </Carousel.Caption>
                            </Carousel.Item> 
                        </Carousel>
                         </Box>
                         </Box>
{/* ///////////////////////////////////// */}
                        {/* 상품검색만들어보자 */}





                    {/* 가수 별 상품나열 */}

                    <Box sx={{ pt:'10%',fontWeight: 'bold',textAlign: 'center',color:'#06e19a',fontSize:70, }}>구경 가자가자 가자고!</Box>
                    <Box sx={{ mt:5, mx:'15%', fontWeight: 'bold',textAlign: 'center',display: 'flex',  flexWrap: 'wrap',justifyContent: 'center', }}>

                        <Box>
                            <Link to='/goodsInfo'className='nav-link'>
                            <Avatar
                            alt="Remy Sharp"
                            variant="square"
                            src={'https://cdn-contents.weverse.io/admin/xlx2048/png/f59ff76e6908409ea9bb7e4f162c7615633.png'}
                            sx={{  borderRadius: 10 ,width: 200, height: 200, textAlign: 'center',  }}
                            /></Link>
                            <Box sx={{ml:3,display:'flex', fontSize:27, fontWeight:'bold',justifyContent: 'space-between', }}>선미
                                <Checkbox {...label} 
                                    sx={{color: pink[1000],'&.Mui-checked': {color: pink[300],},}} icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> 
                            </Box>
                        </Box>

                     
                        




                    </Box>
                </Box>
            


        </div>
    )
}
