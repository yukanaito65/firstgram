import React from 'react'

interface Props {
    imgUrl : string;
  }

function Post(props:Props) {
  return (
<div style={{width:"100%",marginTop:"10px"}} >
<img alt="" src={props.imgUrl} style={{margin:"auto",display:"block"}} />
</div>
  )
}

export default Post
