import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

function LogoutButton() {
  const navigate = useNavigate();

  //signOut関数はfirebaseに用意されている関数
  //ログアウトが成功するとログインページにリダイレクトする
  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <button className="header__logout-button" onClick={logout}>
      ログアウト
    </button>
  );
}

export default LogoutButton;
