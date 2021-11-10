import React from "react";
import {Route,Link} from 'react-router-dom';  //라우트돔

import AppBar1 from "./components/Appbar";    //네비게이션바
import Main from "./components/main/Main";    //메인페이지
import Profile from "./components/pofile/Profile";
import Shop from "./components/shop/Shop";

import Post from "./components/Post";
import GoodsInfo from "./components/shop/GoodsInfo";


const App = () => {
 

  return (
      <div>

          <AppBar1 />
          <Route path="/" component={Main} exact={true}/> 
          <Route path="/Profile" component={Profile} exact={true}/> 
          <Route path="/Shop" component={Shop} exact={true}/> 
          <Route path="/GoodsInfo" component={GoodsInfo} exact={true}/> 
          
          

          
          {/* <Post /> */}
      </div>
  )
}

export default App