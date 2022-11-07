import React from 'react';
import { IoChatbubbleOutline } from "react-icons/io5"

interface Props {
    onClick: () => void;
  }

function CommentButton({ onClick }: Props) {
  return (
    <button type="button" className="" onClick={onClick}>
      <IoChatbubbleOutline />
    </button>
  )
}

export default CommentButton
