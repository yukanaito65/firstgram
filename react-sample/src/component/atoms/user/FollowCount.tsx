import React from "react";
import { Link } from "react-router-dom";

//followList,link,userId,uid
function FollowCount(props: any) {
  return (
    <Link
    to={props.link}
    state={{ userId: props.userId, follow: props.followList, uid: props.uid }}
    >
      <div>{props.followList.length}フォロー中</div>
    </Link>
  );
}

export default FollowCount;
