import React from 'react'
import { useState } from 'react';

function InputRadioSearch() {
    const [val, setVal] = useState('');

    const handleChange = (e:any) => setVal(e.target.value);
  
    return (
      <>
        <label>
          <input
            type="radio"
            value="account"
            onChange={handleChange}
            checked={val === 'account'}
          />
          アカウント名
        </label>
        <label>
          <input
            type="radio"
            value="hashtag"
            onChange={handleChange}
            checked={val === 'hashtag'}
          />
          #
        </label>
        {/* ここに三項演算子でval==='hashtag'とaccountの時で表示を変える */}
        <p>{val}</p>
      </>
    );
  }

export default InputRadioSearch
