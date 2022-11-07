import React from 'react'

interface Props {
    onClick: () => void;
  }

function DeleteButton({ onClick }: Props) {
  return (
    <button type="button" className="" onClick={onClick}>
      削除
    </button>
  )
}

export default DeleteButton
