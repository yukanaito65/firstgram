import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function InputRegisterPass(props: any) {

  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="registerPassForm">
      <span className="registerPassForm__requiredIcon">＊</span>
      <input
        type={isRevealConfirmPassword ? "text" : "password"}
        name="password"
        value={props.valuePassword}
        placeholder="パスワード(半角英小文字、数字を含む6文字以上)"
        onChange={props.passChange}
        pattern="(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,}"
        className="form-input"
        required
      />
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
        className="registerPassForm__isRevealPasswordIcon"
      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>

      <span className="registerPassForm__error-message registerPassForm__messageBox">
        正しい形式で入力してください<br />
        (半角英小文字、数字を含む6文字以上)
      </span>
      {/* <span className="input-ok-message messageBox">OK!</span> */}
    </div>
  );
}

export default InputRegisterPass;
