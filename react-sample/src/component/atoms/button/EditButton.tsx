import React from 'react'

interface Props {
    onClick: () => void;
  }

function EditButton({ onClick }: Props) {
  return (
    <button type="button" className="" onClick={onClick}>
      編集
    </button>
  )
}

export default EditButton
