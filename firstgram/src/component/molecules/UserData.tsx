import React from "react";
import { Link } from "react-router-dom";
import CommonIcon from "../atoms/icon/CommonIcon";
import Name from "../atoms/user/Name";
import UserName from "../atoms/user/UserName";

function UserData(props: any) {
  return (
      <Link
        to={props.users.userId === props.uid ? "/mypage" : "/profile"}
        state={{ userId: props.users.userId }}
      >
        <div id={props.users.userId} style={{display: "flex", gap:"3%", alignItems: "center", marginTop: "3%"}}>
        <CommonIcon icon={props.users.icon} />
        <div>
          <span style={{fontWeight: "bold"}}>
          <UserName users={props.users} />
          </span>
          <Name users={props.users} />
        </div>
        </div>
      </Link>
  );
}

export default UserData;
