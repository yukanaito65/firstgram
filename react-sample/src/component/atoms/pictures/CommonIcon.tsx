import React from "react";

function CommonIcon(props: any) {
  return (
    <div
      className="icon-image"
      style={{
        borderRadius: "50%",
        width: "100px",
        height: "100px",
        border: "2px, lightgray",
      }}
    >
      {props.icon !== "" ? (
        <img
          src={props.icon}
          alt="icon"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/noIcon.png`}
          alt="NoImage"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#d3d3d3",
          }}
        />
      )}
    </div>
  );
}

export default CommonIcon;
