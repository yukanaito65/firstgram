import React from 'react';
import { FaRegBookmark } from "react-icons/fa";


interface Props {
    onClick: () => void;
  }

function KeepButton({ onClick }: Props) {
  return (
    <button type="button" className="" onClick={onClick}>
      <FaRegBookmark />
    </button>
  )
}

export default KeepButton
