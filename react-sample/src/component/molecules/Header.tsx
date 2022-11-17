 import React from 'react'
import Logo from '../atoms/pictures/Logo';
import { IoAddCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom";
 
 function Header() {
   return (
     <header>
        <Logo
        width={80} />
        <Link to="/newPost">
  <IoAddCircleOutline />
  </Link>
     </header>
   )
 }
 
 export default Header
