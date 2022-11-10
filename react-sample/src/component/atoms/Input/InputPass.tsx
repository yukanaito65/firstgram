import React, { useState } from 'react'

interface Props {
    placeHolder: string;
  }

function InputPass({ placeHolder }: Props) {
    const [textState, setTextState] = useState("");
    const handleChange = (e:any) => setTextState(e.target.value)
  return (
    <div>
    <input type="password" name="inputPass" value={textState} placeholder={placeHolder} onChange={handleChange} />
    </div>
  )
}

export default InputPass
