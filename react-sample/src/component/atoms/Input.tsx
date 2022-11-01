import React from 'react';
import { onChange } from '../../redux/inputSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function Input(props:any) {
        // 状態を取ってくる関数
        const input = useSelector((state:any) => state.input.value);
        const dispatch = useDispatch();
        // console.log(input)
        const [inputState, setInputState] = useState("aaa");

  return (
    <div>
        <input type="search" placeholder="ph" onChange={(e) => setInputState(e.target.value)} value={inputState} />
        <button onClick={() => dispatch(onChange(inputState))}>投稿</button>
        <p>input: {input}</p>
    </div>
  )
}

export default Input
