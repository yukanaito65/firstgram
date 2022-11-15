import React from 'react'

interface Props {
    onClick: () => void;
  }

function FollowButton({ onClick }: Props) {
  return (
    <button type="button" className="login-form__button" >
      フォロー
    </button>
  )
}

export default FollowButton
