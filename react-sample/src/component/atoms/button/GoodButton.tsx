import React from 'react';
import { FaRegHeart } from "react-icons/fa";


interface Props {
    onClick: () => void;
  }

function GoodButton({ onClick }: Props) {
  return (
    <button type="button" className="" onClick={onClick}>
      <FaRegHeart />
    </button>
  )
}

export default GoodButton
