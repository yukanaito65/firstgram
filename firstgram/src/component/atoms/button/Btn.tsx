interface Props {
  onClick: ((e:any) => void) | (() => void);
  text: string;
  className: string;
}

function Btn(props: Props) {
  return (
    <button type="button" onClick={props.onClick} className={props.className}>
      {props.text}
    </button>
  );
}

export default Btn;
