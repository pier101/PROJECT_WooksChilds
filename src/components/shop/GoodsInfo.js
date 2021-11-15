import React,{useState}from 'react'
import {Box,Avatar,Checkbox,Divider,Button} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {Carousel} from 'react-bootstrap'
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { Link } from 'react-router-dom';


///////////////////결제 컴포넌트
import {useHistory} from "react-router";
import $ from "jquery";

 function GoodsInfo() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
    const [selecColor, setselecColor] = useState('black');//라디오버튼칼라
    const [size, setsize] = useState('90');//라디오버튼 사이즈
  
    const handleChangeColor = (event) => {
      setselecColor(event.target.value);
    };
    const handleChangeSize = (event) => {
        setsize(event.target.value);
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
    const [수량,set수량] = useState(1)

    
    const [상품,set상품] = useState({
        얼굴:'https://cdn-contents.weverse.io/admin/xlx2048/png/f59ff76e6908409ea9bb7e4f162c7615633.png',
        가격:'30000',
        이름:'frontME(선미라는뜻)'
    },)
    const 총가격= 상품.가격*수량;
//////////////////////////////////////////////////////////////////////////////////결제 넘기기
const history = useHistory();
const [content] = useState({
    // Default form set
    is_direct: 'N',                               // 결제창 방식 (DIRECT: Y | POPUP: N)
    pay_type: 'transfer',                         // 결제수단
    work_type: 'CERT',                            // 결제요청방식
    card_ver: '',                                  // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
    payple_payer_id: '',                          // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)
    buyer_no: '2335',                             // 가맹점 회원 고유번호
    buyer_name: '홍길동',                         // 결제자 이름
    buyer_hp: '01012345678',                      // 결제자 휴대폰 번호
    buyer_email: 'test@payple.kr',                // 결제자 Email
    buy_goods: '휴대폰',                          // 결제 상품
    buy_count: '',                                // 결제 상품 개수
    buy_price: '1000',                            // 결제 금액
    buy_total: '1000',                            // 결제 금액
    buy_istax: 'Y',                               // 과세여부 (과세: Y | 비과세(면세): N)
    buy_taxtotal: '',                             // 부가세(복합과세인 경우 필수)
    order_num: createOid(),                       // 주문번호
    pay_year: '',                                 // [정기결제] 결제 구분 년도
    pay_month: '',                                // [정기결제] 결제 구분 월
    is_reguler: 'N',                              // 정기결제 여부 (Y | N)
    is_taxsave: 'N',                              // 현금영수증 발행여부
    simple_flag: 'N',                             // 간편결제 여부
    auth_type: 'sms'                              // [간편결제/정기결제] 본인인증 방식 (sms : 문자인증 | pwd : 패스워드 인증)
});

const handleChange = (e) => {
    content[e.target.name] = e.target.value;
}
////////////////////결제넘어가기전에 개인정보 여기에 입력해서넘길꺼임
const handleSubmit = (e) => {  //버틑눌러서
    e.preventDefault();
    content.buy_total = 총가격
    content.buy_count = 수량
    content.buy_goods = 상품.이름
    content.buy_price = 상품.가격
    // content.buyer_name =  사용자이름
    // content.buyer_hp= 사용자 핸드폰
    // content.buyer_email =사용자 이메일
    
    
    history.push({
        pathname: '/Payment',
        state: {content: content},
    });
    console.log(history)
}
    
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
                        <form id="orderForm" name="orderForm" onChange={handleChange}>
                        <Box sx={{ display:'flex',justifyContent: 'space-between',}}> 
                            <Box sx={{ pt:1, fontWeight: 'light' ,textAlign: 'left',fontSize:15, }}> {수량}개 가격 얼마      </Box>
                            <Box    sx={{ fontWeight: 'bold' ,textAlign: 'left',fontSize:25, }}>{총가격}원</Box>
                            
                        </Box>
                        </form>
                        <Button onClick={handleSubmit} outlined="contained" color="inherit"sx={{mt:1, width:'100%',height:'0.7%' ,bgcolor:'black',color:"white", fontWeight: 'bold',fontSize:20,textAlign: 'center'}}>결 제 하 기</Button>
                       



                        {/* /////////////////////////////////////////////결제끝 상품 설명 */}



                        <Box sx={{ mt:5, fontWeight: 'bold',textAlign: 'center',fontSize:30, width:'100%',}}>
                        
                            <Box sx={{mt:5, fontWeight: 'bold',fontSize:30, }}> 티샤쓰 기본설명 </Box>
                            <Box sx={{mt:5, fontWeight: 'Medium',fontSize:20, }}> ※ 모델컷의 경우 촬영장소의 환경에 따라 실제 색상과 상이할 수 있습니다.
                            남녀공용
                            도톰한 17수 라운드 티셔츠 입니다.
                            오래입어도 쉽게 모양이 변하지 않는 상품입니다. </Box>
                            <Box sx={{ pt:2,pb:5, fontWeight: 'bold',fontSize:20, textAlign: 'left',}}>
                                 <li>소재: 면</li> 
                                 <li>제조사 : Printstar</li> 
                                 <li>제조국 : Made in 경일아카뒈미</li> 
                                 <li>사이즈 : S,M,L,XL</li> 
                                 <li>신축성 : 줠라  좋음</li> 
                                 <li>감촉 : 아기피부 감촉</li> 
                                 <li>두께 : 구름 소재</li> 
                                 </Box>
                                 <Divider sx={{m:2,mx:0}}/>  
                            <Box sx={{mt:5, fontWeight: 'bold',fontSize:20, }}>세탁 How do you do? </Box>
                            <Box sx={{ pt:2,pb:5, fontWeight: 'Medium',fontSize:20, textAlign: 'left',}}>
                                 <li>드라이크리닝 또는 단독 손세탁가능합니다.</li> 
                                 <li>나염/프린트 제품 세탁시 뒤집어 찬물에 세탁하셔야 합니다.</li> 
                                 <li>다리미 사용 시 천을 올린 후 다림질해 주십시오.</li> 
                                 <li>사이즈 : S,M,L,XL</li> 
                                 <li>신축성 : 줠라  좋음</li> 
                                 <li>감촉 : 아기피부 감촉</li> 
                                 <li>두께 : 구름 소재</li> 
                                 </Box>
                                 <Divider sx={{m:2,mx:0}}/> 
                            <Box sx={{mt:5,mb:5, fontWeight: 'bold',fontSize:30, }}>사진 보셈 </Box> 

                            <img    style={{ width: '100%', margin:1,top:'10vh'}}
                                    className="d-block "
                                    src='/images/Tshirt.PNG'
                                    alt="First slide"
                                    />
                            <Box sx={{ mt:5, fontWeight: 'bold',textAlign: 'center',fontSize:30, width:'100%',}}>
                        
                            <Box sx={{mt:5, fontWeight: 'bold',fontSize:30, }}> 쏄폰 기본설명 </Box>
                            <Box sx={{mt:5, fontWeight: 'Medium',fontSize:20, }}> ※ 모델컷의 경우 촬영장소의 환경에 따라 실제 색상과 상이할 수 있습니다.
                            남녀공용
                            도톰한 17수 라운드 티셔츠 입니다.
                            오래입어도 쉽게 모양이 변하지 않는 상품입니다. </Box>
                            <Box sx={{ pt:2,pb:5, fontWeight: 'bold',fontSize:20, textAlign: 'left',}}>
                                 <li>소재: 면</li> 
                                 <li>제조사 : Printstar</li> 
                                 <li>제조국 : Made in 경일아카뒈미</li> 
                                 <li>사이즈 : S,M,L,XL</li> 
                                 <li>신축성 : 줠라  좋음</li> 
                                 <li>감촉 : 아기피부 감촉</li> 
                                 <li>두께 : 구름 소재</li> 
                                 </Box>
                                 <Divider sx={{m:2,mx:0}}/>  
                            <Box sx={{mt:5, fontWeight: 'bold',fontSize:20, }}>세탁 How do you do? </Box>
                            <Box sx={{ pt:2,pb:5, fontWeight: 'Medium',fontSize:20, textAlign: 'left',}}>
                                 <li>드라이크리닝 또는 단독 손세탁가능합니다.</li> 
                                 <li>나염/프린트 제품 세탁시 뒤집어 찬물에 세탁하셔야 합니다.</li> 
                                 <li>다리미 사용 시 천을 올린 후 다림질해 주십시오.</li> 
                                 <li>사이즈 : S,M,L,XL</li> 
                                 <li>신축성 : 줠라  좋음</li> 
                                 <li>감촉 : 아기피부 감촉</li> 
                                 <li>두께 : 구름 소재</li> 
                                 </Box>
                                 <Divider sx={{m:2,mx:0}}/> 
                            <Box sx={{mt:5,mb:5, fontWeight: 'bold',fontSize:30, }}>사진 보셈 </Box> 
                            <img    style={{ width: '100%', margin:1,top:'10vh'}}
                                    className="d-block "
                                    src='/images/cellphpeon.PNG'
                                    alt="First slide"
                                    />
                            <Box sx={{mt:5, fontWeight: 'bold',fontSize:30, }}> 씨꺼렛케이스 기본설명 </Box>
                            <Box sx={{mt:5, fontWeight: 'Medium',fontSize:20, }}> ※ 모델컷의 경우 촬영장소의 환경에 따라 실제 색상과 상이할 수 있습니다.
                            남녀공용
                            도톰한 17수 라운드 티셔츠 입니다.
                            오래입어도 쉽게 모양이 변하지 않는 상품입니다. </Box>
                            <Box sx={{ pt:2,pb:5, fontWeight: 'bold',fontSize:20, textAlign: 'left',}}>
                                 <li>소재: 면</li> 
                                 <li>제조사 : Printstar</li> 
                                 <li>제조국 : Made in 경일아카뒈미</li> 
                                 <li>사이즈 : S,M,L,XL</li> 
                                 <li>신축성 : 줠라  좋음</li> 
                                 <li>감촉 : 아기피부 감촉</li> 
                                 <li>두께 : 구름 소재</li> 
                                 </Box>
                                 <Divider sx={{m:2,mx:0}}/>  
                            <Box sx={{mt:5, fontWeight: 'bold',fontSize:20, }}>세탁 How do you do? </Box>
                            <Box sx={{ pt:2,pb:5, fontWeight: 'Medium',fontSize:20, textAlign: 'left',}}>
                                 <li>드라이크리닝 또는 단독 손세탁가능합니다.</li> 
                                 <li>나염/프린트 제품 세탁시 뒤집어 찬물에 세탁하셔야 합니다.</li> 
                                 <li>다리미 사용 시 천을 올린 후 다림질해 주십시오.</li> 
                                 <li>사이즈 : S,M,L,XL</li> 
                                 <li>신축성 : 줠라  좋음</li> 
                                 <li>감촉 : 아기피부 감촉</li> 
                                 <li>두께 : 구름 소재</li> 
                                 </Box>
                                 <Divider sx={{m:2,mx:0}}/> 
                            <Box sx={{mt:5,mb:5, fontWeight: 'bold',fontSize:30, }}>사진 보셈 </Box> 
                            <img    style={{ width: '100%', margin:1,top:'10vh'}}
                                    className="d-block "
                                    src='/images/cigarettes.PNG'
                                    alt="First slide"
                                    />
                                    <Box sx={{mt:5, fontWeight: 'bold',fontSize:30, }}> 키링 기본설명 </Box>
                            <Box sx={{mt:5, fontWeight: 'Medium',fontSize:20, }}> ※ 모델컷의 경우 촬영장소의 환경에 따라 실제 색상과 상이할 수 있습니다.
                            남녀공용
                            도톰한 17수 라운드 티셔츠 입니다.
                            오래입어도 쉽게 모양이 변하지 않는 상품입니다. </Box>
                            <Box sx={{ pt:2,pb:5, fontWeight: 'bold',fontSize:20, textAlign: 'left',}}>
                                 <li>소재: 면</li> 
                                 <li>제조사 : Printstar</li> 
                                 <li>제조국 : Made in 경일아카뒈미</li> 
                                 <li>사이즈 : S,M,L,XL</li> 
                                 <li>신축성 : 줠라  좋음</li> 
                                 <li>감촉 : 아기피부 감촉</li> 
                                 <li>두께 : 구름 소재</li> 
                                 </Box>
                                 <Divider sx={{m:2,mx:0}}/>  
                            <Box sx={{mt:5, fontWeight: 'bold',fontSize:20, }}>세탁 How do you do? </Box>
                            <Box sx={{ pt:2,pb:5, fontWeight: 'Medium',fontSize:20, textAlign: 'left',}}>
                                 <li>드라이크리닝 또는 단독 손세탁가능합니다.</li> 
                                 <li>나염/프린트 제품 세탁시 뒤집어 찬물에 세탁하셔야 합니다.</li> 
                                 <li>다리미 사용 시 천을 올린 후 다림질해 주십시오.</li> 
                                 <li>사이즈 : S,M,L,XL</li> 
                                 <li>신축성 : 줠라  좋음</li> 
                                 <li>감촉 : 아기피부 감촉</li> 
                                 <li>두께 : 구름 소재</li> 
                                 </Box>
                                 <Divider sx={{m:2,mx:0}}/> 
                            <Box sx={{mt:5,mb:5, fontWeight: 'bold',fontSize:30, }}>사진 보셈 </Box> 
                            <img    style={{ width: '100%', margin:1,top:'10vh'}}
                                    className="d-block "
                                    src='/images/keyring.PNG'
                                    alt="First slide"
                                    />

                            </Box>
                        </Box>
                    </Box>
                </Box>
        </div>
    )
    //상품 고유번호 !!!!!!!!!!!!!!!!!!!!!!
    
}

$(document).ready(function () {
    $("#card_ver_view").css('display', 'none');
    // 결제 타입에 따라 관련 selectTag의 css속성 변경
    $("#pay_type").on('change', function (e) {

        e.preventDefault();
        const this_val = $(this).val();

        if (this_val === 'card') {
            $("#taxsave_view").css('display', 'none');
            $("#card_ver_view").css('display', '');
        } else {
            $("#taxsave_view").css('display', '');
            $("#card_ver_view").css('display', 'none');
        }
        //카드 결제유형(정기, 일반)에 따라 selectTag의 css속성 변경
        $('#card_ver').on('change', function () {
            if ($(this).val() === '01') {
                $('#is_reguler_view').css('display', '');
                $('#pay_year_view').css('display', '');
                $('#pay_month_view').css('display', '');
                $('#work_type option[value*="AUTH"]').prop('disabled', false);
            } else {
                $('#is_reguler_view').css('display', 'none');
                $('#pay_year_view').css('display', 'none');
                $('#pay_month_view').css('display', 'none');
                $('#work_type option[value*="AUTH"]').prop('disabled', true);
            }
        });
    });
});
const createOid = () => {
    const now_date = new Date();
    let now_year = now_date.getFullYear()
    let now_month = now_date.getMonth() + 1
    now_month = (now_month < 10) ? '0' + now_month : now_month
    let now_day = now_date.getDate()
    now_day = (now_day < 10) ? '0' + now_day : now_day
    const datetime = now_date.getTime();
    return 'test' + now_year + now_month + now_day + datetime;
};

 export default GoodsInfo;