import React from "react";
import { Link } from "react-router-dom";

interface Props {
  followList: string[];
  link: string;
  uid: string;
  userId?: string;
}

function FollowCount(props: Props) {
  return (
    <div className="followCount">
      <Link to={props.link} state={{ userId: props.userId, uid: props.uid }}>
        <p>
          <span
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
