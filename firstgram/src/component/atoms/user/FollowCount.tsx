import React from "react";
import { Link } from "react-router-dom";

interface Props {
  followList: string[];
  link: string;
  uid: string;
  userId?: string;
}
//followList,link,userId,uid
function FollowCount(props: Props) {
  return (
    <div
    // style={{ textAlign: "center", width: "80px" }}
    className="followCount">
      <Link to={props.link} state={{ userId: props.userId, uid: props.uid }}>
        <p>
          <span
          // style={{ fontWeight: "bold" }}
          className="followCount__number">
            {props.followList.length}
          </span>
          <br />
          フォロー中
        </p>
      </Link>
    </div>
  );
}

export default FollowCount;
