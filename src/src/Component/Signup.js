import React, { useState } from "react";
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Post from "./Post";

// import DaumPostcode from "react-daum-postcode";

const Signup = () => {
  const paperStyle = {
    padding: 20,
    width: 380,
    margin: "100px auto",
    height: "73vh",
  };

  const avatarStyle = {
    backgroundColor: "#004DAA",
  };

  //post에서 주소를 받아온곳
  const [address, setAddress] = React.useState("");
  const [popup, setPopup] = React.useState("");

  //비밀번호 유효성 검사
  const checkPassword = e => {
    //  8 ~ 10자 영문, 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    // 형식에 맞는 경우 true 리턴
    console.log("비밀번호 유효성 검사 :: ", regExp.test(e.target.value));
  };

  // 이메일 유효성 검사
  const checkEmail = e => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    console.log("이메일 유효성 검사 :: ", regExp.test(e.target.value));
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <AssignmentIndIcon></AssignmentIndIcon>
          </Avatar>
          <h2>회원가입</h2>
          <Typography variant='caption'>
            아래의 빈칸을 양식에 맞게 넣어주세요.
          </Typography>
        </Grid>

        {/* 아이디 */}
        <TextField
          // margin="400px"
          color='secondary'
          label='ID'
          placeholder='Enter your ID'
          fullWidth
        ></TextField>

        {/* 비밀번호 입력 */}
        <TextField
          // margin="20px"
          label='Password'
          placeholder='Enter your Password'
          type='password'
          onBlur={checkPassword}
          fullWidth
        ></TextField>

        {/* 비밀번호 확인 */}
        <TextField
          // margin="20px"
          label='Confirm Password '
          placeholder='Enter your Password'
          type='password'
          onBlur={checkPassword}
          fullWidth
        ></TextField>

        {/* 이름 */}
        <TextField
          // margin="20px"
          label='Name'
          placeholder='Enter your name'
          fullWidth
        ></TextField>

        {/* 성별 */}
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Gender</FormLabel>
          <RadioGroup
            aria-label='gender'
            defaultValue='female'
            name='radio-buttons-group'
            style={{ display: "initial" }}
          >
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
              // align="center"
            />
            <FormControlLabel value='male' control={<Radio />} label='Male' />
          </RadioGroup>
        </FormControl>

        {/* 이메일 */}
        <TextField
          // margin="20px"
          label='E-mail'
          placeholder='Enter your E-mail'
          // onBlur={checkEmail}
          fullWidth
        ></TextField>

        {/* 전화번호 */}
        <TextField
          // margin="20px"
          label='Phone-number'
          placeholder='Enter your Phone number'
          fullWidth
        ></TextField>

        {/* 주소 */}
        <TextField
          // margin="20px"
          label='Adress'
          placeholder='Enter your Adress'
          fullWidth
        ></TextField>

        <Button
          variant='contained'
          fullWidth
          onClick={() => {
            setPopup(!popup);
          }}
        >
          🔍︎ 주소 검색
        </Button>
        {popup && <Post address={address} setAddress={setAddress}></Post>}

        {/* 상세주소 */}
        <TextField
          // margin="20px"
          label='Detail Adress'
          placeholder='Enter your detial Adress'
          fullWidth
        ></TextField>
        <br></br>
        <br></br>

        {/* 가입버튼 */}
        <Button variant='contained' fullWidth>
          가입하기
        </Button>
      </Paper>
    </Grid>
  );
};

export default Signup;
