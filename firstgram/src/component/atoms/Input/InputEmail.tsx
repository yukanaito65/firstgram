function InputEmail(props:any) {

  return (
    <div>
      <input
        type="email"
        name="email"
        value={props.loginEmail}
        placeholder="メールアドレス"
        onChange={props.emailChange}
        style={{width:"80%", height: "35px", backgroundColor: "#f7f7f7",outline: "solid #d3d3d3", border: "none"}}
      />
    </div>
  );
}

export default InputEmail;
