import React from 'react'

interface Props{
    data:any
}

function Caption(props:Props) {
  return (
    <div style ={{fontSize:"16px",margin:"5px"}}>
    <p>{props.data}</p>
    </div>
  )
}

export default Caption
