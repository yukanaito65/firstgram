interface Props {
  onClick: ((e:any) => void) | (() => void);
  text: string;
}

function Btn(props: Props) {
  return (
    <button type="button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Btn;
