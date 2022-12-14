function InputRequiredRegister(props: any) {
  return (
    <div>
      <span className="requiredRegisterForm__requiredIcon">＊</span>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        pattern={props.pattern}
        data-equal-to={props.equal}
        className="form-input"
        required
      />
      {/* <span className="input-error-message messageBox"> */}
      <span className="requiredRegisterForm__error-message requiredRegisterForm__messageBox">
        正しい形式で入力してください({props.message})
        {props.errorMessage}
      </span>
    </div>
  );
}

export default InputRequiredRegister;
