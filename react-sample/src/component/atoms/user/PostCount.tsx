import React from "react";

//postsで受け取る
function PostCount(props: any) {
  return (
    <div style={{textAlign: "center", width: "80px"}}>
    <span style={{fontWeight:"bold"}}>{props.posts.length}</span><br/>
    投稿
  </div>
  );
}

export default PostCount;
