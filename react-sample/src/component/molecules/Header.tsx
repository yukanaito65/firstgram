import React from "react";
import Logo from "../atoms/pictures/Logo";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import style from "../../css/style";

function Header() {
  return (
    <header>
      <div >
        <Link to={"/"}>
        <Logo width={80} />
        </Link>
        <Link to="/newPost">
          <div>
          <IoAddCircleOutline />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
