import React from 'react'

interface Props {
    onClick: () => void;
  }

function PostButton({ onClick }: Props) {
  return (
    <button type="submit" className="post-form__button" onClick={onClick}>
      投稿する
    </button>
  )
}

export default PostButton
