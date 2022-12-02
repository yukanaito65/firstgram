import React from "react";

function Btn(props: any) {
  return (
    <button
      type="button"
      className="searchpage_form_btn"
      onClick={props.propsOnClick}
    >
      検索
    </button>
  );
}

export default Btn;
