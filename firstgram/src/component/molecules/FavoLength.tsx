import React from 'react'
interface Props{
    favos:any
}

function FavoLength(props:Props) {
  return (
    <div className='favolength'
    // style={{marginLeft:"5px",fontSize:"16px"}}
    >いいね！: {props.favos.length}人</div>
  )
}

export default FavoLength
