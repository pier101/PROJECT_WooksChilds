import React,{useState}from 'react'
import {Box,Avatar,Checkbox,Divider,Button} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {Carousel} from 'react-bootstrap'
import { pink } from '@mui/material/colors';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

// http://gdimg.gmarket.co.kr/1148197420/still/600?ver=1509035838
// 핸드폰 "https://image1.marpple.co/files/u_1566217/2021/10/original/4485e633a3d954522280dc0fc47d6ee992878dcd7.jpg?q=90&w=1600&f=jpg"
export default function GoodsInfo() {
    let[상품,set상품] = useState({
        얼굴:'https://cdn-contents.weverse.io/admin/xlx2048/png/f59ff76e6908409ea9bb7e4f162c7615633.png',
        가격:'3,000,000,000',
        이름:'frontME(선미라는뜻)'
    },)

    return (
        <div>
             <Box sx={{mt:10, mx:'10%',display:'flex',}}>
                 {/* 왼쪽고정 */}
                    <Box sx={{  fontWeight: 'bold',textAlign:'center',width:'55%', height:'10vh' }}>
                        <Box position="fixed" sx={{m:1, fontWeight: 'bold',width:'35%',color:'black' }}>

                        <Carousel variant="dark">
                            <Carousel.Item>
                                <img
                                 style={{ width: '100%', margin:1,top:'10vh'}}
                                className="d-block "
                                src='/images/Tshirt.PNG'
                                alt="First slide"
                                />
                                 <Avatar
                                    
                                    alt="Remy Sharp"
                                    src={상품.얼굴}
                                    variant="rounded"
                                    sx={{ position :'absolute',top:'25%',left:'25%', width: '45%', height: "60%", display: 'center', }}                                    />

                                <Carousel.Caption >
                                <h5>First slide label</h5>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img
                                style={{width: '100%',margin:1}}
                                className="d-block"
                                src="/images/keyring.PNG"
                                alt="Second slide"
                                />
                                 <Avatar
                                    
                                    alt="Remy Sharp"
                                    src={상품.얼굴}
                                    variant="rounded"
                                    sx={{ position :'absolute',top:'40%',left:'28%', width: '42%', height: "43%", display: 'center', }}                                    />


                                <Carousel.Caption>
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>

                             <Carousel.Item>
                                <img
                                style={{width: '100%',margin:1}}
                                className="d-block"
                                src="/images/cellphpeon.png"
                                alt="Third slide"
                                />
                                 <Avatar
                                    
                                    alt="Remy Sharp"
                                    src={상품.얼굴}
                                    variant="rounded"
                                    sx={{ position :'absolute',top:'40%',left:'28%', width: '42%', height: "43%", display: 'center', }}  />


                                <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img
                                style={{width: '100%',margin:1}}
                                className="d-block"
                                src="/images/cigarettes.png"
                                alt="Third slide"
                                />
                                 <Avatar
                                    
                                    alt="Remy Sharp"
                                    src={상품.얼굴}
                                    variant="rounded"
                                    sx={{ position :'absolute',top:'45%',left:'33%', width: '28%', height: "30%", display: 'center', }}  />


                                <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            </Carousel>
                         </Box>
                    </Box>



                    {/* 오른쪽고정 */}

                
                    <Box sx={{ fontWeight: 'bold',textAlign: 'left',fontSize:30, width:'50%',}}>
                        <Box sx={{m:2, fontWeight: 'bold',textAlign: 'left',fontSize:30, }}>{상품.이름}~!😂🤣풰키지 </Box>
                        <Box sx={{ pl:3 ,fontWeight: 'light' ,textAlign: 'left',fontSize:10, }}>"마지막 남은 췐스췐스 4종세트"</Box>

                        <Box sx={{ display:'flex',justifyContent: 'space-between',}}> 
                            <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:25, }}>{상품.가격} 원</Box>
                            <Box sx={{ pb:1, fontWeight: 'light' ,textAlign: 'left',fontSize:15, }}> 찜
                            <Checkbox {...label}sx={{color: pink[1000],'&.Mui-checked': {color: pink[300],},}} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                           찜</Box>
                        </Box>
                        
                        <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:15,color:'gray' }}> 색상  </Box>
                        <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:15,color:'gray' }}> 사이즈  </Box>
                        <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:15,color:'gray' }}> 수량  </Box>
                        <Divider sx={{m:2,mx:0}}/>  
                        <Box sx={{ display:'flex',justifyContent: 'space-between',}}> 
                            <Box sx={{ pt:1, fontWeight: 'light' ,textAlign: 'left',fontSize:15, }}> 1개가격  * 수량선택 만들꺼임  </Box>
                            <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:25, }}>{상품.가격} 원</Box>
                        </Box>

                        
                        <Button outlined="contained" color="inherit"sx={{width:'100%', bgcolor:'black',color:"white", fontWeight: 'bold',textAlign: 'center'}}>결 제 하 기</Button>

                    </Box>
                   






                </Box>
        </div>
    )
}

 