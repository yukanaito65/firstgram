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
      <IoIosArrowBack color="white" size={40} className="to_back" />
    </div>
  );
}

export default BackBtn;
