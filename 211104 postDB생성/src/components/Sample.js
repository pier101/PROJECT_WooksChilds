import React, { Component } from "react";
import axios from 'axios';
import TextareaAutosize from '@mui/material/TextareaAutosize'


class Sample extends Component {
    constructor(props) {
    super(props);
    this.state = {
        noticeTitle : '',
        noticeContent : ''
    }
    };

    WritePost = async(e) => {
        const {noticeContent } = this.state;
        e.preventDefault();

        const res = await axios('http://localhost:5000/posts', {
            method : 'POST',
            data : { 
            'noticeContent' : noticeContent
            }
        });

        if(res.data) {
            alert('데이터를 추가했습니다.');
            return window.location.reload();
        }
    }

    // CreatePost = async(e)=>{
    //     const get = await  axios('http://localhost:5000/posts', {
    //         method : 'POST'
    //     })
    //     if(get){
            
    //     }
    // }



    noticeContentWrite(e) {
    this.setState({ noticeContent : e.target.value })
    }

    render() {
    return(
        <div>
            <form method='POST' onSubmit={this.WritePost}>
                <TextareaAutosize type="text" aria-label="empty textarea" placeholder="Empty" onChange={(e) => this.noticeContentWrite(e)} style={{ width: 200,height: 150 , }}/>
                {/* <input type='text' maxLength='20' placeholder='noticeContent' onChange={(e) => this.noticeContentCreate(e)}/> */}
                <input type='submit' value='완료' />
            </form>
        </div>
    )
    };
};





export default Sample;