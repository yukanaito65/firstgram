import LogoutBtn from "../atoms/button/LogoutBtn";
import SettingBtn from "../atoms/button/SettingBtn";
import FavListBtn from "../atoms/button/FavListBtn";

function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__ul">
        <li className="nav__ul--li">
          <FavListBtn />
        </li>
        <li className="nav__ul--li">
          <SettingBtn />
        </li>
        <li className="nav__ul--li">
          <LogoutBtn />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
