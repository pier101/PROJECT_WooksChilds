import React from "react";
import { Avatar, Grid, Paper, TextField, Typography } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

import Button from "@mui/material/Button";
// import { Search } from "react-daum-postcode";

const Searchpw = () => {
  const paperStyle = {
    padding: 20,
    width: 380,
    margin: "100px auto",
    height: "73vh",
  };

  const avatarStyle = {
    backgroundColor: "#004DAA",
  };

  <Grid>
    <Paper elevation={10} style={paperStyle}>
      <Grid align='center'>
        <Avatar style={avatarStyle}>
          <AssignmentIndIcon></AssignmentIndIcon>
        </Avatar>
        <h2>ID/비밀번호 찾기</h2>
        <Typography variant='caption'>
          아래의 칸에 알맞는 정보를 입력해 주세요.
        </Typography>
      </Grid>

      <TextField> </TextField>

      <Button>보내기</Button>
    </Paper>
  </Grid>;
};
export default Searchpw;
