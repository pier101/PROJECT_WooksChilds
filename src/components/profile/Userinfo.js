import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import axios from "axios";
import multer from "multer";
// import Post from "../Login/Post";

const Input = styled("input")({
  display: "none",
});

const BASE_URL = "http://localhost:5000";

// //post에서 주소를 받아온곳
// const [address, setAddress] = React.useState("");
// const [popup, setPopup] = React.useState("");

// //유저 아이디 받아오는 곳
// const [username, setUserName] = React.useState("");
// const [userid, setUserId] = React.useState("");

function UserInfo() {
  const paperStyle = {
    padding: 100,
    width: 700,
    margin: "100px auto",
    height: "900px",
  };

  //multer를 이용한 이미지파일 업로드
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const [isSucces, setSuccess] = useState(null);

  const submit = async () => {
    const formdata = new FormData();
    formdata.append("avatar", userInfo.file);

    axios
      .post("http://localhost:5000/imageupload", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // 응답 상태 확인
        console.warn(res);
        if (res.data.success === 1) {
          setSuccess("이미지 업로드 성공!!!!");
        }
      });
  };

  //db에서 유저 네임/id 가져오기
  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/Userinfo`);
    // setUserName(res.data.username);
    // setUserId(res.data.userid);
    console.log(res.data);
  }, []);

  // 이메일 유효성 검사
  const checkEmail = (e) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    console.log("이메일 유효성 검사 :: ", regExp.test(e.target.value));
  };

  //비밀번호 유효성 검사
  const checkPassword = (e) => {
    //  8 ~ 10자 영문, 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    // 형식에 맞는 경우 true 리턴
    console.log("비밀번호 유효성 검사 :: ", regExp.test(e.target.value));
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid>
          <h3 style={{ textalign: "center" }}>회원정보 수정</h3>

          <div className="container mr-60">
            <div className="formdesign">
              {isSucces !== null ? <h4> {isSucces} </h4> : null}
              <div className="form-row">
                <label className="text-white">
                  <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
                </label>
              </div>

              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span" type="submit" className="btn btn-dark" onClick={() => submit()}>
                  프로필사진수정
                </Button>
              </label>

              <div className="form-row">
                <button type="submit" className="btn btn-dark" onClick={() => submit()}>
                  {" "}
                  Save{" "}
                </button>
              </div>
            </div>

            {userInfo.filepreview !== null ? <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" /> : null}
          </div>

          {/* <Avatar
            sx={{ mb: 1, width: 100, height: 100 }}
            onChange={handleInputChange}
            type="file"
            className="form-control"
            // alt="Remy Sharp"
            // src={유저정보.userImg}
            // sx={{ mb:5, width: 200, height: 200, textAlign: 'center'  }}
          /> */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Stack>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              {/* 이름 / 수정불가 */}
              <Typography label="username">사용자 이름 :{/* {username} */}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* 아이디 / 수정불가*/}
              <Typography label="userid">사용자 아이디 :{/* {userid} */}</Typography>
            </Grid>
          </Grid>

          <br></br>
          <Box>
            {/* 메일주소 / 수정가능*/}
            <TextField
              // margin="20px"
              label="E-mail"
              placeholder="Enter your E-mail"
              onBlur={checkEmail}
              fullWidth
            ></TextField>
            <Button variant="contained" fullWidth>
              메일주소 변경하기
            </Button>
            <hr></hr>
            {/* 비밀번호 / 변경 가능*/}
            <TextField
              // margin="20px"
              label="Password"
              placeholder="Enter your Password"
              type="password"
              onBlur={checkPassword}
              fullWidth
            ></TextField>
            {/* 비밀번호 변경 확인 */}
            <TextField label="Confirm Password " placeholder="Enter your Password" type="password" onBlur={checkPassword} fullWidth></TextField>
            <Button variant="contained" fullWidth>
              비밀번호 변경하기
            </Button>
            <hr></hr>
            {/* 전화번호 */}
            <TextField
              // margin="20px"
              label="Phone-number"
              placeholder="Enter your Phone number"
              fullWidth
            ></TextField>
            <Button variant="contained" fullWidth>
              전화번호 변경하기
            </Button>
            <hr></hr>
            {/* 주소
            <TextField
              // margin="20px"
              label="Adress"
              placeholder="Enter your Adress"
              fullWidth
            ></TextField>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setPopup(!popup);
              }}
            >
              🔍︎ 주소 검색 //{" "}
            </Button>
            {popup && <Post address={address} setAddress={setAddress}></Post>}
            {/* 상세주소 */}
            {/* <TextField 
              // margin="20px"
              label="Detail Adress"
              placeholder="Enter your detial Adress"
              fullWidth
            ></TextField> */}
            {/* 수정 완료버튼/ 버튼 누르면 수정 정보가 DB에저장되고 마이페이지로 이동  */}
            <Button variant="contained" fullWidth>
              수정완료
            </Button>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default UserInfo;
