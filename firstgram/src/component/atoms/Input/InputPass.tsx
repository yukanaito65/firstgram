// import "../../../css/validation"

function InputPass(props:any) {

  return (
    <div className="input_fieldset">
      <input
        type="password"
        name="password"
        value={props.valuePassword}
        placeholder={props.placeholder}
        onChange={props.passChange}
        pattern="(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,}"
        style={{width:"80%", height: "35px", backgroundColor: "#f7f7f7",outline: "solid #d3d3d3", border: "none"}}
        required
      />
      {/* <label className="label">パスワード(英半角子文字、半角数字を必ず含み、6文字以上)</label> */}
      <span className="input-error-message messageBox">正しい形式で入力してください</span>
      {/* <span className="input-ok-message messageBox">OK!</span> */}
    </div>
  );
}

export default InputPass;
