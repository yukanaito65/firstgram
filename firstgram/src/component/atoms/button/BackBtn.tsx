import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function BackBtn() {
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };
  return (
    <div onClick={onClickBack}>
      <IoIosArrowBack color="rgb(38, 38, 38)" size={35} className="backBtn__icon" />
    </div>
  );
}

export default BackBtn;
