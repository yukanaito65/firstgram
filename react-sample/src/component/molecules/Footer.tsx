import React from 'react';
import { FaHome } from "react-icons/fa"
import { FaSearch } from "react-icons/fa"
import { MdAccountCircle } from "react-icons/md"
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
        <Link to="/">
        <FaHome />
        </Link>

        <Link to="#">
        <FaSearch />
        </Link>

        <Link to="/mypage/">
        <MdAccountCircle />
        </Link>
    </footer>
  )
}

export default Footer
