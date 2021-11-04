import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize'
const Post = () => {
    return (
        <div className="create-post" style={{backgroundColor:'aqua'}}>
            <form action="post">
            <TextareaAutosize aria-label="empty textarea" placeholder="Empty" style={{ width: 200,height: 150 , }}/>
            <button type="submit">완료</button>
            </form>
        </div>
    )
}

export default Post
