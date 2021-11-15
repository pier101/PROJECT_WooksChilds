/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import AppBar1 from "./components/Appbar";
import Main from "./components/main";
import Artist from "./components/artist";
import Login from "./components/Login";
import Shop from './components/shop/Shop'
import Profile from "./components/profile/Profile"
import GoodsInfo from "./components/shop/GoodsInfo";
import Payment from "./components/shop/Payment"
import Signup from "./components/Login/Signup";



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
  // if (isLogin) {
  //   return (
  //     <div>
  //       <AppBar1 isLogin={isLogin} />
  //       <Route  path="/" component={Main} isLogin={isLogin} exact />
  //       <Route  path="/artist/:name" isLogin={isLogin} component={Artist} />
  //       <Route path="/Profile" component={Profile} exact/> 
  //       <Route path="/Shop" component={Shop} exact/> 
  //       <Route path="/GoodsInfo" component={GoodsInfo} exact/> 
  //     </div>
  //   );
  // } 
  // else {
  //   return(
  //     <Route  path="/login" isLogin={isLogin} component={Login} exact />
  //   )
  // }
  
  if(!isLogin){
    return (
        <div>
          <AppBar1 isLogin={isLogin} />
          <Route  path="/login" isLogin={isLogin} component={Login} exact />
          <Route  path="/"  isLogin={isLogin}component={Main} exact />
          <Route  path="/artist/:name" isLogin={isLogin} component={Artist} />
          {/* 철순형꺼 */}
          <Route path="/Profile" component={Profile} exact/> 
          <Route path="/Shop" component={Shop} exact/> 
          <Route path="/GoodsInfo" component={GoodsInfo} exact/> 
          <Route path="/Payment" component={Payment} exact/> 
          <Route  path="/Signup" isLogin={isLogin} component={Signup} exact />
          
          
      </div>
    );
  }


};

export default App;
