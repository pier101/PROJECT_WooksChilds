const express=require('express');
const app=express();

app.get('/', (req,res)=> {
    res.send('연결')
})
app.listen(3000,()=>{
    console.log('서버')
})