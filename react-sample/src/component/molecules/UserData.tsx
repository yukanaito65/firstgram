import React from "react";
import { Link } from "react-router-dom";
import CommonIcon from "../atoms/pictures/CommonIcon";
import Name from "../atoms/user/Name";
import UserName from "../atoms/user/UserName";

function UserData(props: any) {
  return (
    <Link to={props.users.userId === props.uid ? "/mypage" : "/profile"} state={{ userId: props.users.userId }}>
      <div id={props.users.userId}>
        <CommonIcon icon={props.users.icon} />
        <div>
          <UserName users={props.users} />
          <Name users={props.users} />
        </div>
      </div>
    </Link>
  );
}

export default UserData;
