import React from "react";

function PostIcon(props: any) {
  return (
    <div className="post-icon-image">
      {props.icon !== "" ? (
        <img
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

export default PostIcon;
