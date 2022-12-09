import React from "react";

interface Props {
  icon: string;
}

function ProfileIcon(props: Props) {
  return (
    <div className="profileIcon-image">
      {props.icon !== "" ? (
        <img
          className="profileIcon-image__img"
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

export default ProfileIcon;
