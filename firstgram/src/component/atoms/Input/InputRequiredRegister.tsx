function InputRequiredRegister(props: any) {
  return (
    <div>
      <span className="form__requiredIcon">＊</span>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        pattern={props.pattern}
        data-equal-to={props.equal}
        className="form__input"
        required
      />
      {/* <span className="input-error-message messageBox"> */}
      <span className="form__error-message form__messageBox">
        正しい形式で入力してください({props.message})
        {props.errorMessage}
      </span>
    </div>
  );
}

export default InputRequiredRegister;
