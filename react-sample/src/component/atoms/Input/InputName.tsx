import React, { useState } from 'react'

interface Props {
    plaseHolder: string;
  }

function InputName({ plaseHolder }: Props) {
    const [textState, setTextState] = useState("");
    const handleChange = (e:any) => setTextState(e.target.value)
  return (
    <div>
    <input type="text" name="inputName" value={textState} placeholder={plaseHolder} onChange={handleChange} />
    </div>
  )
}

export default InputName;
