import React, { useState } from "react";
import {Carousel} from 'react-bootstrap'
import { Box } from '@mui/system';
import {Link} from 'react-router-dom'

export default function Goods() {
  let [구쯔,set구쯔] = useState([
    {goodsNum:1, goodsSale: "10%", goodsName:'내가제일날나가 빽',goodsPrice:5000,goodsImg:"https://mblogthumb-phinf.pstatic.net/MjAxOTA3MjZfMTg0/MDAxNTY0MTMzNjk1OTYy.dvJseblVc5ppVDMBiz2R5qlzFjaJ3AdEP8b45D0gkhQg.udsPZTN5zyrKOaGUYPZHQBGQyd5A0s_65-Y4lpeAYiMg.PNG.mosfnet/190726_%EA%B8%B0%ED%9A%8D%EC%9E%AC%EC%A0%95%EB%B6%80_%ED%97%A4%EB%8D%94_%EA%B5%AD%EA%B2%BD%EC%97%86%EB%8A%94%EA%B5%BF%EC%A6%88.png?type=w800"},
    {goodsNum:2,goodsSale: "5%", goodsName:'굿즈모음집',goodsPrice:10000,goodsImg:"https://cdn.imweb.me/upload/S2020082446693c4afe0bb/3e6cc05f1e75a.jpg"},
    {goodsNum:3,goodsSale: "30%", goodsName:'시장이 붐바야',goodsPrice:10000,goodsImg:"https://image.edaily.co.kr/images/Photo/files/NP/S/2017/08/PS17080800590.jpg"},
  ])

    return(
      <>
      <Box sx={{mt: 15, mx: "13%",}}>   
       <Carousel fade>
         {구쯔.map((상품,i)=>{
               return(
                 <Carousel.Item key={i} style={{ height: '500px', cursor:'pointer'  }} onClick={()=>{console.log('경로설정')}}>
          <Link to='/Shop'className='nav-link' > 
          <img
            className="d-block w-100 "
            src={상품.goodsImg}
            alt="First slide"
            /> 
      
          <Carousel.Caption >
            
           
            <h1 >{상품.goodsSale} Season Off</h1>
            <h3>{상품.goodsName}  </h3> <h3> Price:{상품.goodsPrice} </h3>
            <p> This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.</p>
          </Carousel.Caption></Link>
        </Carousel.Item> 
    
        )})}
       
     

      </Carousel>
      </Box>
    </>
)}