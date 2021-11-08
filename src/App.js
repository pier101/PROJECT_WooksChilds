import React from "react";
import AppBar1 from "./components/Appbar";
import Artists from "./components/main/Artists";
import Goods from "./components/main/Goods";
import News from "./components/main/News";
import Post from "./components/Post";
import Sample from './components/Sample';
const App = () => {
 

  return (
      <div>

          <AppBar1 />
          <Artists />
          <Goods />
          <News />

          
          <Post />
      </div>
  )
}

export default App