// import "../../../css/validation"

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function InputPass(props:any) {

  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div style={{position: "relative"}}>
      <input
        type="password"
        name="password"
        value={props.valuePassword}
        placeholder="パスワード"
        onChange={props.passChange}
        style={{width:"80%", height: "35px", backgroundColor: "#f7f7f7",outline: "solid #d3d3d3", border: "none"}}
        required
      />
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
        className="input_isRevealPassword_icon"
      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>
    </div>
  );
}

export default InputPass;
