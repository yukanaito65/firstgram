import React from "react";
import { IoAddCircle } from "react-icons/io5";

function RegisterIcon() {
  return (
    <div
    //  style={{  position: "relative",}}
     className="registerIcon">
      <div
        className="icon-image"
        // style={{
        //   borderRadius: "50%",
        //   width: "120px",
        //   height: "120px",
        //   border: "solid 1px lightgray",
        // }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/noIcon.png`}
          alt="NoImage"
          // style={{
          //   width: "100%",
          //   height: "100%",
          //   backgroundColor: "#d3d3d3",
          //   borderRadius: "50%",
          // }}
          className="noIconImage"
        />
      </div>
      <div>
        <IoAddCircle
        // style={{ color: "#0d6efd", position: "absolute",top:"75%", left: "65%", }}
        className="addIcon"
        size={30} />
      </div>
    </div>
  );
}

export default RegisterIcon;
