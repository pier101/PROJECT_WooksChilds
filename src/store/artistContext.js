import React, { useState,useEffect,createContext } from "react";
import axios from 'axios'

export const ArtistCardContext = createContext();

const ArtistStore = (props) =>{

    const  [artistCard,setArtistCard] = useState([]);

    //아티스트 썸넬 컨텍스트 생성용 데이터 불러오기
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getArtistCard = async() =>{
        axios.get(`http://localhost:5000/artistCard`)
        .then( (res)=>{
        console.log(res.data)
        setArtistCard(res.data)})
    }

    useEffect(() => {
    getArtistCard()
    }, [])

    return(
        <ArtistCardContext.Provider value={artistCard}>
            {props.children}
        </ArtistCardContext.Provider> 
    )
}


export default ArtistStore;