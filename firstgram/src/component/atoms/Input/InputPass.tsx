import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface Props {
  passChange: any;
  valuePassword: string;
}

function InputPass(props: Props) {
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  return (
    <div
    // style={{ position: "relative" }}
    className="form"
    >
      <input
        type={isRevealConfirmPassword ? "text" : "password"}
        name="password"
        value={props.valuePassword}
        placeholder="パスワード"
        className="form__input"
        onChange={props.passChange}
        // style={{width:"80%", height: "35px", backgroundColor: "#f7f7f7",outline: "solid #d3d3d3", border: "none"}}
        required
      />
      <span
        onClick={toggleConfirmPassword}
        role="presentation"
        className="form_isRevealPasswordIcon"
      >
        {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </span>
    </div>
  );
}

export default InputPass;
