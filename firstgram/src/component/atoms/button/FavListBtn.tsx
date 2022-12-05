import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";

function FavListBtn() {
  return (
    <Link to={"/keep"}>
      <button className="navBtn">
        保存一覧
        <FaBookmark size={20} className="navBtn--icon" />
      </button>
    </Link>
  );
}

export default FavListBtn;
