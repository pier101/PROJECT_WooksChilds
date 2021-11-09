import React from "react";
import AppBar1 from "./components/Appbar";    //네비게이션바
import Main from "./components/main/Main";    //메인페이지
import Profile from "./components/pofile/Profile";


import Post from "./components/Post";

const App = () => {
 

  return (
      <div>

          <AppBar1 />
          <Main />
        
          <Profile />
          <Post />
      </div>
  )
}

export default App