import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

function LogoutBtn() {
    const navigate = useNavigate();

  //ログアウトが成功するとログインページにリダイレクトする
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
  return (
    <button onClick={logout} className="nav_menu_btn">ログアウト</button>
    )
}

export default LogoutBtn
