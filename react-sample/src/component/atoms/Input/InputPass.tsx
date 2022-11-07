import React, { useState } from 'react'

interface Props {
    plaseHolder: string;
  }

function InputPass({ plaseHolder }: Props) {
    const [textState, setTextState] = useState("");
    const handleChange = (e:any) => setTextState(e.target.value)
  return (
    <div>
    <input type="password" name="inputPass" value={textState} placeholder={plaseHolder} onChange={handleChange} />
    </div>
  )
}

export default InputPass
