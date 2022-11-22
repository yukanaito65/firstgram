import React from "react";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="footer-width">
        <div className="u-margin-auto" >
          <FaHome size={60} color={"navy"} />
        </div>
      </Link>

      <Link to="#" className="footer-width">
        <div className="u-margin-auto" >
          <FaSearch size={60} color={"navy"} />
        </div>
      </Link>

      <Link to="/mypage/" className="footer-width">
        <div className="u-margin-auto" >
          <MdAccountCircle size={60} color={"navy"} />
        </div>
      </Link>
    </footer>
  );
}

export default Footer;
