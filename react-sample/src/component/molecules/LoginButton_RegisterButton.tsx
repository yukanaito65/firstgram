import React from 'react'
import LoginButton from '../atoms/button/LoginButton'
import RegisterButton from '../atoms/button/RegisterButton'

function LoginButton_RegisterButton() {
  return (
    <>
    <div>
        <LoginButton
        onClick={() => console.log("ログインボタン")} />
        <RegisterButton
        onClick={() => console.log("登録ボタン")} />
    </div>
    </>
  )
}

export default LoginButton_RegisterButton
