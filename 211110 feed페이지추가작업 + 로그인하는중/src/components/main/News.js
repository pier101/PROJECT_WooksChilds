import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';

const heights = [300, 370 , 260, 350, 410, 370, 320, 300,];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: '1px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function News() {
  return (
    <Box sx={{ mt: 15, mx: "15%"    }}>
        <Box ><h1>From.Atrist</h1></Box>
      <Masonry columns={4} sx={{display: 'flex',  flexWrap: 'wrap', }} spacing={{ xs: 1, sm: 2, md: 3 }}>
        {heights.map((height, i) => (
          <Paper key={i} elevation={3}  sx={{ height,minWidth:'280px' }}>
            {i + 1} 
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
}
