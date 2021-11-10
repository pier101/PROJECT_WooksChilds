import React,{useState,useEffect} from "react";
import Main from "./components/main";
import AppBar1 from "./components/Appbar";
import Artist from "./components/artist"
import Login from './components/Login'
import {Route } from 'react-router-dom'
import axios from 'axios'

const App = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=>{
    if(sessionStorage.getItem('user_id')=== null){
      console.log('isLogin ?? ::', isLogin)
    } else {
      setIsLogin(true)
      console.log('isLogin ?? ::',isLogin)
    }
  })
  if(isLogin){
    return (
      <div>
        <AppBar1  isLogin={isLogin}/>
        <Route style={{marginTop:40}} path="/" component={Main} isLogin={isLogin} exact/>
        <Route style={{marginTop:40}} path="/artist/:name" isLogin={isLogin} component={Artist}/>
      </div>
    )
  } else {
    return (
      <div>
        <AppBar1 isLogin={isLogin}/>
        <Route style={{marginTop:40}} path="/" component={Main} isLogin={isLogin} exact/>
        <Route style={{marginTop:40}} path="/artist/:name" isLogin={isLogin} component={Artist}/>
        <Route style={{marginTop:40}} path="/login" isLogin={isLogin} component={Login} exact/>
      </div>
    )}
  }

export default App