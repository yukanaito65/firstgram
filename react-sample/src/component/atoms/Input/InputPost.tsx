import React from 'react';
import { useState } from 'react';

interface Props {
  placeHolder: string;
}

function InputPost({ placeHolder }: Props) {
    const [textState, setTextState] = useState("");
    const handleChange = (e:any) => setTextState(e.target.value)
  return (
    <div>
    <textarea
    rows={10} cols={40}
    name="inputPost" value={textState} placeholder={placeHolder} onChange={handleChange} />
    </div>
  )
}

export default InputPost;
