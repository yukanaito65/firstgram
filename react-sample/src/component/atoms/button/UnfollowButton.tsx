import React from 'react'

interface Props {
    onClick: () => void;
  }

function UnfollowButton({ onClick }: Props) {
  return (
    <button type="button" className="" onClick={onClick}>
      フォロー解除
    </button>
  )
}

export default UnfollowButton
