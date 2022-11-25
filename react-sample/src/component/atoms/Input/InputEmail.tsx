import React, { useState } from "react";

function InputEmail(props:any) {
  // const [textState, setTextState] = useState("");

  // const emailChange = (e: any) => {
  //   setTextState(e.target.value);
  //   props.handleChange();
  // };

  return (
    <div>
      <input
        type="email"
        name="email"
        value={props.loginPassword}
        placeholder="メールアドレス"
        onChange={props.handleChange}
      />
    </div>
  );
}

export default InputEmail;
