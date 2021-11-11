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

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user_id") === null) {
      console.log("isLogin ?? ::", isLogin);
    } else {
      setIsLogin(true);
      console.log("isLogin ?? ::", isLogin);
    }
  });
  if (isLogin) {
    return (
      <>
        <AppBar1 isLogin={isLogin} />
        <Route  path="/" component={Main} isLogin={isLogin} exact />
        <Route  path="/artist/:name" isLogin={isLogin} component={Artist} />
        <Route path="/Profile" component={Profile} exact/> 
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
          <Route  path="/" component={Main}  exact />
          <Route  path="/artist/:name"  component={Artist} />
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
