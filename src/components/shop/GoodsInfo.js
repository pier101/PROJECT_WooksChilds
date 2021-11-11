import React,{useState}from 'react'
import {Box,Avatar,Checkbox,Divider,Button} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {Carousel} from 'react-bootstrap'
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

export default function GoodsInfo() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    const [selecColor, setselecColor] = useState('black');//라디오버튼칼라
    const [size, setsize] = useState('90');//라디오버튼 사이즈
  
    const handleChangeColor = (event) => {
      setselecColor(event.target.value);
    };
    const handleChangeSize = (event) => {
      setselecColor(event.target.value);
    };
  
    const controlProps = (item) => ({
      checked: selecColor === item,
      onChange: handleChangeColor,
      value: item,
      name: 'color-radio-button-demo',
      inputProps: { 'aria-label': item },
    });
    const sizeProps = (item) => ({
      checked: size === item,
      onChange: handleChangeSize,
      value: item,
      name: 'color-radio-button-demo',
      inputProps: { 'aria-label': item },
    });
//////////////////////////////////////////////////////////////// 라디오끝
    let [수량,set수량] = useState(1)

    
    let[상품,set상품] = useState({
        얼굴:'https://cdn-contents.weverse.io/admin/xlx2048/png/f59ff76e6908409ea9bb7e4f162c7615633.png',
        가격:30000,
        이름:'frontME(선미라는뜻)'
    },)
    let 총가격= 상품.가격*수량;
    
    return (
        <div>
             <Box sx={{mt:10, mx:'10%',display:'flex',}}>
                 {/* 왼쪽고정 이미지 */}
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
                        <Box sx={{mt:2, fontWeight: 'bold',textAlign: 'left',fontSize:30, }}>{상품.이름}~!😂🤣풰키지 </Box>
                        <Box sx={{ pl:2 ,fontWeight: 'light' ,textAlign: 'left',fontSize:10, }}>"마지막 남은 췐스췐스 4종 세트"</Box>

                        <Box sx={{ display:'flex',justifyContent: 'space-between',}}> 
                            <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:25, }}>{상품.가격} 원</Box>
                            <Box sx={{ pb:1, fontWeight: 'light' ,textAlign: 'left',fontSize:15, }}> 찜
                            <Checkbox {...label}sx={{color: pink[1000],'&.Mui-checked': {color: pink[300],},}} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                           찜</Box>
                        </Box>
                        


                        <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:15,color:'gray' }}> 색상 
                        <Box sx={{ display:'flex',fontSize:15,}}>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...controlProps('blue')}  size="small"/> blue  </Box>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...controlProps('purple')} color="secondary" size="small" /> purple  </Box>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...controlProps('green')} color="success"  size="small"/> green  </Box>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...controlProps('black')} color="default"  size="small"/> black  </Box>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...controlProps('red')} size="small" sx={{ color: pink[10],'&.Mui-checked': { color: pink[600],},}} /> red  </Box>
                        </Box>
                        </Box>
                        <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:15,color:'gray' }}> 사이즈  
                        <Box sx={{ display:'flex',fontSize:15,}}>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...sizeProps('90')} color="default"  size="small"/> 90  </Box>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...sizeProps('95')} color="default"  size="small"/> 95  </Box>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...sizeProps('100')} color="default"  size="small"/> 100  </Box>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...sizeProps('105')} color="default"  size="small"/> 105  </Box>
                            <Box sx={{ fontWeight: 'Medium',}}><Radio  {...sizeProps('110')} color="default"  size="small"/> 110  </Box>
                        </Box>
                        </Box>


                        <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:15,color:'gray' }}> 수량  </Box>
                        <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:20,color:'gray' }}> 
                        <input type='number' value={수량} onChange={(e)=>{set수량(e.target.value)}}/></Box>
                            
                        <Divider sx={{m:2,mx:0}}/>  
                        <Box sx={{ display:'flex',justifyContent: 'space-between',}}> 
                            <Box sx={{ pt:1, fontWeight: 'light' ,textAlign: 'left',fontSize:15, }}> {수량}개 가격 얼마      </Box>
                            <Box sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:25, }}>{총가격}원</Box>
                        </Box>

                        
                        <Button outlined="contained" color="inherit"sx={{width:'100%', bgcolor:'black',color:"white", fontWeight: 'bold',textAlign: 'center'}}>결 제 하 기</Button>

                    </Box>
                   






                </Box>
        </div>
    )
}

 