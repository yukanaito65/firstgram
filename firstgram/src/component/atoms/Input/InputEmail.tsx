interface Props {
  emailChange: any;
  valueEmail: string;
  requiredIcon?: any;
}

function InputEmail(props: Props) {
  return (
    <div>
      {props.requiredIcon}
      <input
        id="email"
        type="email"
        name="email"
        value={props.valueEmail}
        placeholder="メールアドレス"
        onChange={props.emailChange}
        className="form__input"
        // style={{
        //   width: "80%",
        //   height: "35px",
        //   backgroundColor: "#f7f7f7",
        //   outline: "solid #d3d3d3",
        //   border: "none",
        // }}
        required
      />
    </div>
  );
}

export default InputEmail;
