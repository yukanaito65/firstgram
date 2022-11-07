import React from 'react';
import { FaTelegramPlane } from "react-icons/fa"

interface Props {
    onClick: () => void;
  }

function DmButton({ onClick }: Props) {
  return (
    <button type="button" className="" onClick={onClick}>
      <FaTelegramPlane />
    </button>
  )
}

export default DmButton
