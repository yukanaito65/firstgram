// import "../../../css/validation"

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function InputRegisterPass(props: any) {

  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="input_fieldset" style={{position: "relative"}}>
      <span className="register_form_requiredIcon">＊</span>
      <input
        type="password"
        name="password"
        value={props.valuePassword}
        placeholder="パスワード(半角英小文字、数字を含む6文字以上)"
        onChange={props.passChange}
        pattern="(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,}"
        style={{
          width: "80%",
          height: "35px",
          backgroundColor: "#f7f7f7",
          outline: "solid #d3d3d3",
          border: "none",
        }}
        required
      />
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
        className="input_isRevealPassword_icon"
      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>

      <span className="input-error-message messageBox">
        正しい形式で入力してください
      </span>
      {/* <span className="input-ok-message messageBox">OK!</span> */}
    </div>
  );
}

export default InputRegisterPass;
