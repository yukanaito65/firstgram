import React from 'react'

interface Props {
    onClick: () => void;
  }

function LogoutButton({ onClick }: Props) {
  return (
    <button type="button" className="header__logout-button" onClick={onClick}>
      ログアウト
    </button>
  )
}

export default LogoutButton
