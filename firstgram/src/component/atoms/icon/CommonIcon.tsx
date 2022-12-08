import React from "react";

interface Props {
  icon: string;
}

function CommonIcon(props: Props) {
  return (
    <div className="icon-image">
      {props.icon !== "" ? (
        <img
          className="icon-image__img"
          src={props.icon}
          alt="icon"
        />
      ) : (
        <img
          className="noIconImage"
          src={`${process.env.PUBLIC_URL}/noIcon.png`}
          alt="NoImage"
        />
      )}
    </div>
  );
}

export default CommonIcon;
