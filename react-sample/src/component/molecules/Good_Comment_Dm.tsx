import React from 'react'
import CommentButton from '../atoms/button/CommentButton'
import DmButton from '../atoms/button/DmButton'
import GoodButton from '../atoms/button/GoodButton'

function Good_Comment_Dm() {
  return (
    <>
    <div>
        <GoodButton
        onClick={() => console.log(GoodButton)} />
        <CommentButton
        onClick={() => console.log(CommentButton)} />
        <DmButton
        onClick={() => console.log(DmButton)} />
    </div>
    </>
  )
}

export default Good_Comment_Dm
