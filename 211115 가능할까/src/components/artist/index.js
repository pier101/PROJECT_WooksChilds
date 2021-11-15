import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Box} from '@mui/material';
import { Link } from "react-router-dom";
import Feed from './feed.js'
import {Grid} from '@material-ui/core';
import './style.css'

const Menu = ({match})=>{
    console.log(match)
    const [isFeed, setIsFeed] = useState(true)
    const [isArtist, setIsArtist] = useState(false)
    
    const feedChanger = ()=>{
        setIsFeed(true)
        setIsArtist(false)
        console.log(isFeed)
    }
    const artistChanger = ()=>{
        setIsFeed(false)
        setIsArtist(true)
    }

    return(
    <Box sx={{mt:20}} className="artist-box" style={{display:'flex', justifyContent:"center" }}>
        <Box style={{width:"30%",display:'flex',justifyContent:"center" }} className="aside-box">
            <Grid>
                <Grid item xs={3} md={4}>
                    <ArtistInfo  match={match}/>
                </Grid>
                <Grid item xs={3} md={4}> 
                    <Box className='menu-box'>
                        <button className="menu-button" type="button" onClick={feedChanger}>feed</button>
                        <button className="menu-button" type="button" onClick={artistChanger}>artist</button>
                        <button className="menu-button"><Link  style={{textDecoration:"none"}} to={"/Shop"}>shop</Link></button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Box style={{width:"60%",display:'flex',justifyContent:"center" }} className="feed-box">
            <Feed style={{textAlign:"center"}}  match={match} isFeed={isFeed} isArtist={isArtist}/>
        </Box>
    </Box>
    )
}


const ArtistInfo = ({match}) => {
    const imgStyle = {
        width: 300,
        height: 300,
        borderRadius: 150,
    };
    console.log(match)
    const [viewArtistInfo , setArtistInfo] = useState([]);
    
    useEffect(()=>{
        const artistinfo =async()=> {
            const getartistinfo = await axios.get(`http://localhost:5000/artist/artistinfo/${match.params.name}`)
            console.log(getartistinfo.data)
            setArtistInfo(getartistinfo.data[0])
            
        }
        artistinfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div>
            <img style={imgStyle} src={viewArtistInfo.artistCardImg} alt="artistImg" />
           <h2>{viewArtistInfo.artistName}</h2>
        </div>
    )
}



export default Menu;



