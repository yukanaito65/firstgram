import React from 'react'
import { Link } from "react-router-dom";

function DeleteCompPage() {
  return (
    <div>
        アカウントが削除されました
        <Link to="/login">
        <button>ログイン画面へ</button>
        </Link>
    </div>
  )
}

export default DeleteCompPage
