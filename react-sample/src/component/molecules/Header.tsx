import React from "react";
import Logo from "../atoms/pictures/Logo";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../../css/style.css";

function Header() {
  return (
    <header className="header">
      <div className="header-warpper">
        <div className="header-logo">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <div className="header-add-btn">
          <Link to="/newPost">
            <IoAddCircleOutline size={50} color={"navy"} />
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;
