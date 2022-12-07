import React from "react";
import { Post } from "../../../types/types";

interface Props {
  posts: Post[];
}
//postsで受け取る
function PostCount(props: Props) {
  return (
    <div
    className="postCount">
    <span
    className="postCount__number"
    >{props.posts.length}</span><br/>
    投稿
  </div>
  );
}

export default PostCount;
