import React, { useState } from "react";

function InputCPass(props: any) {
  return (
    <div>
      <span className="register_form_requiredIcon">＊</span>
      <input
        type="password"
        name="Cpassword"
        placeholder="確認用パスワード"
        data-equal-to="email"
        pattern={props.passwordValue}
        style={{
          width: "80%",
          height: "35px",
          backgroundColor: "#f7f7f7",
          outline: "solid #d3d3d3",
          border: "none",
        }}
        required
      />
      <span className="input-error-message messageBox">
        パスワードが一致しません
      </span>
    </div>
  );
}

export default InputCPass;
