import React from "react";
import { IoAddCircle } from "react-icons/io5";

function RegisterIcon() {
  return (
    <div className="registerIcon">
      <div className="registerIcon__icon-image">
        <img
          src={`${process.env.PUBLIC_URL}/noIcon.png`}
          alt="NoImage"
          className="noIconImage"
        />
      </div>
      <div>
        <IoAddCircle
        className="registerIcon__addIcon"
        size={30} />
      </div>
    </div>
  );
}

export default RegisterIcon;
