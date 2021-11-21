import React,{useState,useEffect,useContext} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';
import {Link } from 'react-router-dom'
import {ArtistCardContext} from "../../store/artistContext"

export default function Artists() {
    const context = useContext(ArtistCardContext)
    //로딩시 카드불러올꺼임

    return (
      <>
              <Box sx={{mt: 15, mx: "10%"  ,display: 'flex',  flexWrap: 'wrap', justifyContent: 'center' ,}}>
            {context&& context.map((a,i)=>{
                        return(
                          <Link to={`/artist/${a.artistName}`} value={a.artistName} style={{color:"black",textDecoration:"none"}} > 
                            <Card  key={i} onClick={()=>{  console.log(  "이동처리하셈" )}} sx={{ maxWidth: 280, m:1 }}>
                                <CardActionArea>
                                  <CardMedia
                                    component="img"
                                    height="250"
                                    image={a.artistCardImg}
                                    alt="green iguana"
                                  />
                                  <CardContent>
                                    <Typography   sx={{ height:25, fontStyle: 'italic'  }} gutterBottom variant="h4" component="div">
                                      {a.artistName}
                                    </Typography>
                                  </CardContent>  
                                </CardActionArea>
                            </Card>
                          </Link>
            )}) }
    
            </Box>
        </>
      );
    }