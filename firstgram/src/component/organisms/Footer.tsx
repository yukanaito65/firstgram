import { FaHome, FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <footer className="footer">
      <ul className="footer__ul">
        {currentPath === "/" ? (
          <li className="footer__ul--li">
            <div className="footer__ul--liNoLink">
              <FaHome
                size={30}
                color={"#FF9168"}
                className="footer__ul--liIcon"
              />
            </div>
          </li>
        ) : (
          <li className="footer__ul--li">
            <Link to="/" className="footer__ul--liLink">
              <FaHome
                size={30}
                color={"rgb(38, 38, 38)"}
                className="footer__ul--liIcon"
              />
            </Link>
          </li>
        )}

        {currentPath === "/searchPage" ? (
          <li className="footer__ul--li">
            <div className="footer__ul--liNoLink">
              <FaSearch
                size={30}
                color={"#FF9168"}
                className="footer__ul--liIcon"
              />
            </div>
          </li>
        ) : (
          <li className="footer__ul--li">
            <Link to="/searchPage" className="footer__ul--liLink">
              <FaSearch
                size={30}
                color={"rgb(38, 38, 38)"}
                className="footer__ul--liIcon"
              />
            </Link>
          </li>
        )}

        {currentPath === "/mypage/" ? (
          <li className="footer__ul--li">
            <div className="footer__ul--liNoLink">
              <MdAccountCircle
                size={30}
                color={"#FF9168"}
                className="footer__ul--liIcon"
              />
            </div>
          </li>
        ) : (
          <li className="footer__ul--li">
            <Link to="/mypage/" className="footer__ul--liLink">
              <MdAccountCircle
                size={30}
                color={"rgb(38, 38, 38)"}
                className="footer__ul--liIcon"
              />
            </Link>
          </li>
        )}
      </ul>
    </footer>
  );
}

export default Footer;
