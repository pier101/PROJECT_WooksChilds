import React, {useEffect, useState} from "react";
import { Grid, Paper, Avatar, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import axios from 'axios'
import { Redirect } from "react-router";
import { useDispatch } from 'react-redux';
//import { loginUser } from '../../modules/user';
import { withRouter } from 'react-router-dom';
//import Login from "./";

const Login = (props) => {
  //CSS
  const paperStyle = {
    padding: 20,
    width: 380,
    margin: "100px  200px auto",
    height: "70vh",
  };
  const avatarStyle = { backgroundColor: "#004DAA" }; 

 
  const [idValue, setIdValue] = useState("")
  const [pwValue, setPwValue] = useState("")

  const handleIdValue = e =>{
    setIdValue(e.target.value);
    console.log(e.target.value)
  }
  const handlePwValue = e =>{
    setPwValue(e.target.value);
    console.log(e.target.value)
  }


  const onClickLogin = ()=>{
    console.log('로그인 버튼 클릭');
    const login =async ()=> {
      await axios.post('http://localhost:5000/auth/logintest',{id:idValue, pw: pwValue })
    .then(res =>{
      console.log(res.data.userId)
     if(res.data.userId === idValue && res.data.userPwd === pwValue) {
        console.log('======================','로그인 성공')
        sessionStorage.setItem('user_id', idValue)
        document.location.href = '/'
    } else {
      console.log('========',res.data.msg)
      alert('아이디 또는 비밀번호가 일치하지 않습니다.')
  }
  
   
    })}
    login()
  }

  useEffect(()=>{
    axios.get('/auth/logintest').then(res=>console.log(res.data)).catch()
    console.log(sessionStorage)
  },[])

  // 로그인창
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <br></br>
          <h2>로그인</h2>
        </Grid>

        {/* 아이디 입력창 */}
        <TextField
          margin="20px"
          label="UserName"
          placeholder="Enter User Name"
          fullWidth
          onChange={handleIdValue}
        ></TextField>

        {/* 비밀번호 입력창 */}
        <TextField
          margin="20px"
          label="PassWord"
          placeholder="EnterPassWord"
          type="password"
          fullWidth
          required
          onChange={handlePwValue}
        ></TextField>
        <br></br>
        {/* 체크박스 */}
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="이 ID를 기억합니다."
            labelPlacement="end"
          />
        </FormGroup>
        <br></br>
        {/* 로그인 버튼 */}
        <Stack direction="row" spacing={0}>
          <Button variant="contained" fullWidth onClick={onClickLogin}> 
            Login
          </Button>
        </Stack>
        <br></br>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            typography: "body1",
            "& > :not(style) + :not(style)": {
              ml: 4,
            },
          }}
        >
          <Link href="#" underline="hover">
            {"비밀번호 찾기"}
          </Link>
          <Link href="#" underline="hover">
            {"아이디 찾기"}
          </Link>
          <Link href="" underline="hover" path="/Signup">
            {"회원가입"}
          </Link>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
