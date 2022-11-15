import React from 'react'
import { Link } from "react-router-dom";

function DeleteCompPage() {
  return (
    <div>
        アカウントの削除に失敗しました
        <Link to="/AccountSettingPage">
        <button>設定画面へ</button>
        </Link>
    </div>
  )
}

export default DeleteCompPage
