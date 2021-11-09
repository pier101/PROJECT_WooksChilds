import React from "react";
import { Grid, Paper, Avatar, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Signup from "./Signup";

const Login = () => {
  const paperStyle = {
    padding: 20,
    width: 380,
    margin: "100px  200px auto",
    height: "70vh",
  };

  const avatarStyle = { backgroundColor: "#004DAA" };

  // 로그인창
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon></LockIcon>
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
        ></TextField>

        {/* 비밀번호 입력창 */}
        <TextField
          margin="20px"
          label="PassWord"
          placeholder="EnterPassWord"
          type="password"
          fullWidth
          required
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
          <Button variant="contained" fullWidth>
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
