interface Props {
    inputValue: string | undefined;
    onChange: any;
    inputName: string | undefined;
  }

function InputText(props:Props) {
  return (
    <input
      type="text"
      value={props.inputValue}
      onChange={(e) => props.onChange(e.target.value)}
      name={props.inputName}
    />
  );
}

export default InputText;
