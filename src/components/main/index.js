import React from 'react'
import Thumbnail from './Thumbnail'
import Goods from './Goods'
import News from './News'
import Post from './Post'
import Footer from './Footer'
import Vedios from './Vedios'


//import Testartist from './testartist' 
//import Artist from './components/artist'
const index = (props) => {
  const isLogin = props.isLogin
    return (
        <div>
          <Thumbnail/>
          <Goods />
          <News />
          <Vedios />

          <Footer />
        </div>
    )
}

export default index
