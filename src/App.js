import React from "react";
import AppBar1 from "./components/Appbar";    //네비게이션바
import Main from "./components/main/Main";    //메인페이지
import Profile from "./components/pofile/Profile";
import {Route,Link} from 'react-router-dom';  //라우트돔


import Post from "./components/Post";

const App = () => {
 

  return (
      <div>

          <AppBar1 />
          <Route path="/" component={Main} exact={true}/> 
          <Route path="/Profile" component={Profile} exact={true}/> 

          
          {/* <Post /> */}
      </div>
  )
}

export default App