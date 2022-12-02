import React, { useState } from 'react'



function InputComment() {
    const [inputComment,setInputComment]=useState<any>()

  return (
    <input
style={{width:"100%"}}
type="text" value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}></input>
  )
}

export default InputComment
