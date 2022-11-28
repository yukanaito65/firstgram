import React from "react";
import { Link } from "react-router-dom";

//followList,link,userId,uid
function FollowCount(props: any) {
  return (
    <div style={{textAlign: "center", width: "80px"}}>
    <Link
    to={props.link}
    state={{ userId: props.userId, uid: props.uid }}
    >
      <p>
        <span style={{fontWeight:"bold"}}>{props.followList.length}</span><br/>
        フォロー中
      </p>
    </Link>
    </div>
  );
}

export default FollowCount;
