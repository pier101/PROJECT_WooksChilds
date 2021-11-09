import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';
import {Route,Link} from 'react-router-dom'

export default function Artists() {
    let [box,set가수아이디] = useState([
    {가수이름:"CL",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
    {가수이름:"WINNER",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/png/122262f1689046e7b47f568a3f5c1765066.png"},
    {가수이름:"BLACKPINK",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/png/9748dae239044e65835bd894768beebe971.png"},
    {가수이름:"FTILAND",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/png/0d1c0a2d47b24cbe88d3e37ef41e1048379.png"},
    {가수이름:"GFRIEND",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/png/12529b280a424913b549ac2f73f00d28081.png"},
    {가수이름:"cl",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
    {가수이름:"cl",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
    {가수이름:"cl",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
    {가수이름:"cl",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
    {가수이름:"cl",가수이미지:"https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg"},
  ]);

    return (
        <>
         <Box sx={{mt: 15, mx: "10%"  ,display: 'flex',  flexWrap: 'wrap', justifyContent: 'center' ,}}>
        { box.map((a,i)=>{
                    return(
                      <Link to='/test'className='nav-link' >
            <Card  key={i} onClick={()=>{  console.log(  "이동처리하셈" )}} sx={{ maxWidth: 280, m:1 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image={a.가수이미지}
                alt="green iguana"
              />
              <CardContent>
                <Typography   sx={{ height:25, fontStyle: 'italic'  }} gutterBottom variant="h4" component="div">
                   {a.가수이름}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card></Link>   
        )}) }
        </Box>
        </>
      );
    }