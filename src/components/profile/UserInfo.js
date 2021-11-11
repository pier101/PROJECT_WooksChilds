import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const userInfo = () => {
  const paperStyle = {
    padding: 380,
    width: 380,
    height: "70vh",
    margin: "center",
  };

  //   function userName() {
  //     const [input, setInput] = userState({
  //       username: "",
  //     });

  //     const nameInput = useRef();

  //     //할당한후 값을 추출하기
  //     const { username } = input;

  //     const onChang = e => {
  //       //e.target value와  name을 추출한다
  //       const { value, username } = e.target;
  //       setInput({
  //         ...input, // 기존 input 객체를 복사
  //         [username]: value, //name 키를 가진 값을 value로 설정함
  //       });
  //     };
  //   }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Box>
            <Box>
              {/* 이름 / 수정불가 */}
              <Typography label='username/데이터에서 받아오기'>
                username
              </Typography>
              {/* 아이디 / 수정불가*/}
            </Box>
            <Box>
              {/* 메일주소 / 수정가능*/}
              {/* 비밀번호 / 변경 가능*/}
              {/* 비밀번호 변경 확인 */}
            </Box>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default userInfo;
