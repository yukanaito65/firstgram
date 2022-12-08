import React from 'react'

interface Props {
    displayComment : any;
  }

function CommentsDisplay(props:Props) {
  return (
    <div className='commentdisplay'>
    {props.displayComment.map((data:any,index:any)=>{
    return(
    <div 
    className='commentdisplay__comset'
    key={index} 
    // style={{display:"flex",fontSize:"16px",width:"100%",margin:"3px"}}
    >
    <p 
    className='commentdisplay__username'
    // style={{fontWeight:"500"}}
    >{data.userName}</p>
    <p className='commentdisplay__com'
    // style={{marginLeft:"5px"}}
    >{data.commentText}</p>
    </div>
    )
    })}
    </div>
  )
}

export default CommentsDisplay
