import React, { useState } from 'react'


function InputCPass(props:any) {

  return (
    <div>
    <input
    type="password"
    name="Cpassword"
    placeholder="確認用パスワード"
    data-equal-to="email"
    style={{
      width: "80%",
      height: "35px",
      backgroundColor: "#f7f7f7",
      outline: "solid #d3d3d3",
      border: "none",
    }}
    required
    />
    <span className="input-error-message messageBox">正しい形式で入力してください</span>
    </div>
  )
}

export default InputCPass;
