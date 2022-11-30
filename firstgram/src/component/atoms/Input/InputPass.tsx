// import "../../../css/validation"

function InputPass(props:any) {

  return (
    <div>
      <input
        type="password"
        name="password"
        value={props.valuePassword}
        placeholder="パスワード"
        onChange={props.passChange}
        style={{width:"80%", height: "35px", backgroundColor: "#f7f7f7",outline: "solid #d3d3d3", border: "none"}}
        required
      />
    </div>
  );
}

export default InputPass;
