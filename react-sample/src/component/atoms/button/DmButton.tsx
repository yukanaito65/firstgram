import React from 'react'

interface Props {
    onClick: () => void;
  }

function DmButton({ onClick }: Props) {
  return (
    <button type="button" className="" onClick={onClick}>
      {/* マテリアルアイコンを入れる */}
    </button>
  )
}

export default DmButton
