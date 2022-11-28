import React from 'react';
import { useState } from 'react';

function InputSearch() {
    const [textState, setTextState] = useState("");
    const handleChange = (e:any) => setTextState(e.target.value)
  return (
    <div>
    <input type="search" name="inputSearch" value={textState} placeholder="search" onChange={handleChange} />
    </div>
  )
}

export default InputSearch;
