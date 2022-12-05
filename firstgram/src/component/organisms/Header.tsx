import Logo from "../atoms/pictures/Logo";
import { IoAddCircleOutline } from "react-icons/io5";
import "../../css/style.css";
import { FiMenu, FiX } from "react-icons/fi";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { FaBookmark } from "react-icons/fa";
import { BsGearWide } from "react-icons/bs";


function Header({show}:{show:boolean}) {
  const [navDisplay, setNavDisplay] = useState<boolean>(false);

  const navActive = () => {
    setNavDisplay(!navDisplay);
  };

  const navigate = useNavigate();

  //ログアウトが成功するとログインページにリダイレクトする
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };

  return (
    <>
      <header className="header">
        <div className="header-warpper">
          <div className="header-logo">
            <Logo />
          </div>

        {show &&
          <div className="header-btns">
            <Link to="/newPost">
              <button className="header-post-btn">
                <IoAddCircleOutline size={40} color={"white"} />
              </button>
            </Link>
            {navDisplay ? (
              <button className="header-menu-btn" onClick={() => navActive()}>
                <FiX size={40} color={"white"} />
              </button>
            ) : (
              <button className="header-menu-btn" onClick={() => navActive()}>
                <FiMenu size={40} color={"white"} />
              </button>
            )}
          </div>}
        </div>
      </header>

      {show && navDisplay ? (
        <nav className="nav">
          <ul className="nav_menu_ul">
            <li className="nav_menu_li">
              <Link to={"/keep"}>
                <button className="nav_menu_btn">保存一覧
                <FaBookmark size={20} className="nav_menu_icon" />
                </button>
              </Link>
            </li>
            <li className="nav_menu_li">
              <Link to={"/AccountSettingPage"}>
                <button className="nav_menu_btn">設定
                <BsGearWide size={20} className="nav_menu_icon" />
                </button>
              </Link>
            </li>
            <li className="nav_menu_li">
              <Link to={"/AccountSettingPage"}>
                <button onClick={logout} className="nav_menu_btn">ログアウト</button>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;
