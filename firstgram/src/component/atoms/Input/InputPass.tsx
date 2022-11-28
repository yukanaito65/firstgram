function InputPass(props:any) {

  return (
    <div>
      <input
        type="password"
        name="password"
        value={props.loginPassword}
        placeholder="パスワード"
        onChange={props.passChange}
        style={{width:"80%", height: "35px", backgroundColor: "#f7f7f7",outline: "solid #d3d3d3", border: "none"}}
      />
    </div>
  );
}

export default InputPass;
