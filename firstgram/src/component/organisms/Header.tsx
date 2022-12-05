import Logo from "../atoms/pictures/Logo";
import { IoAddCircleOutline } from "react-icons/io5";
import "../../css/style.css"
import { FiMenu, FiX } from "react-icons/fi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../molecules/Nav";


function Header({show}:{show:boolean}) {
  const [navDisplay, setNavDisplay] = useState<boolean>(false);

  const navActive = () => {
    setNavDisplay(!navDisplay);
  };

  return (
    <>
      <header className="header">
        <div className="headerWarpper">
          <div className="header__logo">
            <Logo />
          </div>

        {show &&
          <div className="header__btns">
            <Link to="/newPost">
              <button className="header__btns--addPost">
                <IoAddCircleOutline size={40} color={"white"} />
              </button>
            </Link>
            {navDisplay ? (
              <button className="header__btns--nav" onClick={() => navActive()}>
                <FiX size={40} color={"white"} />
              </button>
            ) : (
              <button className="header__btns--nav" onClick={() => navActive()}>
                <FiMenu size={40} color={"white"} />
              </button>
            )}
          </div>}
        </div>
      </header>

      {show && navDisplay ? (
        <Nav />
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;
