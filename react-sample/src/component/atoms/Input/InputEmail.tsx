import React, { useState } from 'react'


function InputEmail() {
    const [textState, setTextState] = useState("");
    const handleChange = (e:any) => setTextState(e.target.value)
  return (
    <div>
    <input type="email" name="inputEmail" value={textState} placeholder="メールアドレスを入力してください" onChange={handleChange} />
    </div>
  )
}


export default InputEmail
