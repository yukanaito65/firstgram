import React from 'react'

interface Props {
    onClick: () => void;
  }

function LoginButton({ onClick }: Props) {
  return (
    <button type="button" className="login-form__button" onClick={onClick}>
      ログイン
    </button>
  )
}

export default LoginButton
