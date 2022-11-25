import React from "react";

//postsで受け取る
function PostCount(props: any) {
  return <div>{props.posts.length}投稿</div>;
}

export default PostCount;
