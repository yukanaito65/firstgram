import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="footer-width">
        <div className="footer-border-right" >
          <FaHome size={35} color={"rgb(38, 38, 38)"} />
        </div>
      </Link>

      <Link to="/searchPage" className="footer-width">
        <div className="footer-border-right" >
          <FaSearch size={35} color={"rgb(38, 38, 38)"} />
        </div>
      </Link>

      <Link to="/mypage/" className="footer-width">
        <div >
          <MdAccountCircle size={35} color={"rgb(38, 38, 38)"} className="icon" />
        </div>
      </Link>
    </footer>
  );
}

export default Footer;
