import React, { useState, useEffect } from "react";
import { Route,Switch } from "react-router-dom";

import AppBar1 from "./components/Appbar";
import Main from "./components/main";
// import Artist from "./components/artist";
import Login from "./components/Login";
import Shop from './components/shop/Shop'
import Profile from "./components/profile/Profile"
import GoodsInfo from "./components/shop/GoodsInfo";
import Signup from "./components/Signup";
import Menu from "./components/artist/index";
//-----------------------------------------------//
import Payment from "./components/shop/Payment";
import UserInfo from "./components/profile/Userinfo";
import {Board} from "./page/index";
import Admin from "./components/admin";
import Searchpw from "./components/Login/Searchpw";
import FindIdPw from "./components/Login/findIdPw";
import ArtistStore from "./store/artistContext"



const App = ({match}) => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user_id") === null) {
      console.log("isLogin ?? ::", isLogin);
    } else {
      setIsLogin(true);
      console.log("isLogin ?? ::", isLogin);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //로그인 되있을떄
  if (isLogin) {
    return (
      <ArtistStore>
        <AppBar1 isLogin={isLogin} />
        <Route  path="/" component={Main} match={match} exact />
        <Route  path="/artist/:name"  component={Menu} exact/>
        <Route path="/mypage/:id" component={Profile} exact/> 
        <Route path="/Shop" component={Shop} exact/> 
        <Route path='/Admin' component={Admin} exact />
        <Route path="/GoodsInfo/:num" component={GoodsInfo} exact/> 
        <Route path='/Payment' component={Payment} exact /> 
        <Route path='/Userinfo' component={UserInfo} exact />
        <Route path="/GoodsInfo/:num" component={GoodsInfo} exact/> 
        <Board/>
      </ArtistStore>
    );
  } 
  // else {
  //   return(
  //     <ArtistStore>
  //       <Route path="/signup" component={Signup} exact/> 
  //       <Route path='/Searchpw' component={Searchpw} exact />
  //       <Route  path="/find/userinfo" component={FindIdPw} exact />
  //       <Route  path="/login" isLogin={isLogin} component={Login} exact />
  //     </ArtistStore>
  //   )
  // }
  
  
  //로그인 안되있을떄
  if(!isLogin){
    return (
        <ArtistStore>
            <AppBar1 isLogin={isLogin} />
            <Route  path="/" component={Main} match={match} exact />
            <Route  path="/artist/:name" match={match}  component={Menu} exact/>
            {/* 철순형꺼 */}
            <Route path="/shop" component={Shop} exact/> 
            <Route path='/Payment' component={Payment} exact /> 
            <Route path='/Userinfo' component={UserInfo} exact />
            <Route path='/Searchpw' component={Searchpw} exact />
            <Route  path="/find/userinfo" component={FindIdPw} exact />
            <Route path='/Admin' component={Admin} exact />
            <Route path="/GoodsInfo/:num" component={GoodsInfo} exact/> 
            <Route path="/signup" component={Signup} exact/> 
            <Route  path="/login" isLogin={isLogin} component={Login} exact />
            <Board/>
      </ArtistStore>
    );
  }


};

export default App;
