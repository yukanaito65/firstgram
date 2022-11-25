import React, { useState } from "react";

function InputPass(props:any) {
  // const [textState, setTextState] = useState("");

  // const passChange = (e: any) => {
  //   setTextState(e.target.value);
  //   props.handleChange();
  // }

  return (
    <div>
      <input
        type="password"
        name="password"
        value={props.loginEmail}
        placeholder="パスワード"
        onChange={props.handleChange}
      />
    </div>
  );
}

export default InputPass;
