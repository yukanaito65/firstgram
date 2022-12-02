import React from 'react'

interface Props {
    displayComment : any;
  }

function CommentsDisplay(props:Props) {
  return (
    <div>
    {props.displayComment.map((data:any,index:any)=>{
    return(
    <div key={index} style={{display:"flex",fontSize:"16px",width:"100%",margin:"3px"}}>
    <p style={{fontWeight:"500"}}>{data.userName}</p>
    <p style={{marginLeft:"5px"}}>{data.commentText}</p>
    </div>
    )
    })}
    </div>
  )
}

export default CommentsDisplay
