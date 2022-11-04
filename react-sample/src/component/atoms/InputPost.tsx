import React from 'react';
import { useState } from 'react';

function InputPost() {
    const [textState, setTextState] = useState("");
    const handleChange = (e:any) => setTextState(e.target.value)
  return (
    <div>
    <textarea 
    rows={10} cols={40} 
    name="inputPost" value={textState} placeholder="キャプションを入力…" onChange={handleChange} />
    </div>
  )
}

export default InputPost;
