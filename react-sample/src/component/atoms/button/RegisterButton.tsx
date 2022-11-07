import React from 'react'

interface Props {
    onClick: () => void;
  }

function RegisterButton({ onClick }: Props) {
  return (
    <button type="submit" className="register-form__register-button" onClick={onClick}>
      ログアウト
    </button>
  )
}

export default RegisterButton
