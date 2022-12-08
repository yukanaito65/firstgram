import { Link } from "react-router-dom";
import { BsGearWide } from "react-icons/bs";

function SettingBtn() {
  return (
    <Link to={"/AccountSettingPage"}>
      <button className="navBtn">
        設定
        <BsGearWide size={20} className="navBtn--icon" />
      </button>
    </Link>
  );
}

export default SettingBtn;
