import React from 'react';
import { useState } from 'react';

interface Props {
  plaseHolder: string;
}

function InputPost({ plaseHolder }: Props) {
    const [textState, setTextState] = useState("");
    const handleChange = (e:any) => setTextState(e.target.value)
  return (
    <div>
    <textarea 
    rows={10} cols={40} 
    name="inputPost" value={textState} placeholder={plaseHolder} onChange={handleChange} />
    </div>
  )
}

export default InputPost;
