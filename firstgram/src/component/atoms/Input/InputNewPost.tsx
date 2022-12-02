import React, { useState } from 'react'

function InputNewPost() {
// コメント
const [textState, setTextState] = useState("");
// コメントの更新
const InputText = (e:any)=>{
    setTextState(e.target.value)
    }
return (
    <div>
    <textarea value={textState} placeholder="コメントを入力
    してください" onChange={InputText} 
    style={{width:"100%",height:"100px"}}
    />
    </div>
)
}

export default InputNewPost
