import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function InputCPass(props: any) {

  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="CpassForm">
      <span className="CpassForm__requiredIcon">＊</span>
      <input
        type={isRevealConfirmPassword ? "text" : "password"}
        name="Cpassword"
        placeholder="確認用パスワード"
        data-equal-to="email"
        pattern={props.passwordValue}
        className="CpassForm__input"
        required
      />
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
        className="CpassForm__isRevealPasswordIcon"
      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>
      <span className="CpassForm__error-message CpassForm__messageBox">
        パスワードが一致しません
      </span>
    </div>
  );
}

export default InputCPass;
