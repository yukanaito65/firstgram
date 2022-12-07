import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function InputCPass(props: any) {

  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div
    // style={{position: "relative"}}
    className="form"
    >
      <span className="form__requiredIcon">＊</span>
      <input
        type={isRevealConfirmPassword ? "text" : "password"}
        name="Cpassword"
        placeholder="確認用パスワード"
        data-equal-to="email"
        pattern={props.passwordValue}
        className="form__input"
        // style={{
        //   width: "80%",
        //   height: "35px",
        //   backgroundColor: "#f7f7f7",
        //   outline: "solid #d3d3d3",
        //   border: "none"
        // }}
        required
      />
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
        className="form__isRevealPasswordIcon"
      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>
      <span className="form__error-message form__messageBox">
        パスワードが一致しません
      </span>
    </div>
  );
}

export default InputCPass;
