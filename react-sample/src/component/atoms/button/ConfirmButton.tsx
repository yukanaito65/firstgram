import React from 'react'

interface Props {
    onClick: () => void;
  }

function ConfirmButton({ onClick }: Props) {
  return (
    <button type="button" className="login-form__button" onClick={onClick}>
      確定
    </button>
  )
}

export default ConfirmButton
