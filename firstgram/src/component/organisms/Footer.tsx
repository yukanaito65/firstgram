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
        {currentPath === "/" ?
        (<li className="footer__ul--li">
            <FaHome size={35} color={"#FF9168"} className="footer__ul--liLink" />
        </li>) : (
          <li className="footer__ul--li">
          <Link to="/" className="footer__ul--liLink">
            <FaHome size={35} color={"rgb(38, 38, 38)"} />
          </Link>
        </li>
        )
          }

          {currentPath === "/searchPage" ? 
        (<li className="footer__ul--li">
            <FaSearch size={35} color={"#FF9168"} className="footer__ul--liLink" />
        </li>) : (
          <li className="footer__ul--li">
          <Link to="/searchPage" className="footer__ul--liLink">
            <FaSearch size={35} color={"rgb(38, 38, 38)"} />
          </Link>
        </li>
        )
        }

        {currentPath === "/mypage/" ?
        (<li className="footer__ul--li">
            <MdAccountCircle
              size={35}
              color={"#FF9168"}
              className="footer__ul--liIcon"
            />
        </li>) : (
          <li className="footer__ul--li">
          <Link to="/mypage/" className="footer__ul--liLink">
            <MdAccountCircle
              size={35}
              color={"rgb(38, 38, 38)"}
              className="footer__ul--liIcon"
            />
          </Link>
        </li>
        )
        }
      </ul>
    </footer>
  );
}

export default Footer;
