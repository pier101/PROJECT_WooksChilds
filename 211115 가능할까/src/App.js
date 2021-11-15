import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import AppBar1 from "./components/Appbar";
import Main from "./components/main";
import Artist from "./components/artist";
import Login from "./components/Login";
import Shop from './components/shop/Shop'
import Profile from "./components/profile/Profile"
import GoodsInfo from "./components/shop/GoodsInfo";
import Signup from "./components/Signup";
import Menu from "./components/artist/index";

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
  if (isLogin) {
    return (
      <>
        <AppBar1 isLogin={isLogin} />
        <Menu match={match}/>
        <Route  path="/" component={Main} isLogin={isLogin} exact />
         <Route  path="/artist/:name"  component={Menu} />
        {/* <Route  path="/artist/:name" isLogin={isLogin} component={Artist} /> */}
        <Route path="/mypage/:id" component={Profile} exact/> 
        <Route path="/Shop" component={Shop} exact/> 
        <Route path="/GoodsInfo" component={GoodsInfo} exact/> 
      </>
    );
  } 
  // else {
  //   return(
  //     <Route  path="/login" isLogin={isLogin} component={Login} exact />
  //   )
  // }
  
  if(!isLogin){
    return (
        <>
          <AppBar1 isLogin={isLogin} />
          <Route  path="/login"  component={Login} exact />
          <Route  path="/login"  component={Login} exact />
          <Route  path="/" component={Main} match={match} exact />
          {/* <Route  path="/artist/:name/"  component={Artist} /> */}
          <Route  path="/artist/:name"  component={Menu} />
          {/* <Route  path="/artist/:name"  component={Artist} /> */}
          {/* 철순형꺼 */}
          <Route path="/profile" component={Profile} exact/> 
          <Route path="/shop" component={Shop} exact/> 
          <Route path="/goodsInfo" component={GoodsInfo} exact/> 
          <Route path="/signup" component={Signup} exact/> 
      </>
    );
  }


};

export default App;
