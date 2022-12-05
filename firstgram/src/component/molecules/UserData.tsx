import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/types";
import CommonIcon from "../atoms/icon/CommonIcon";
import Name from "../atoms/user/Name";
import UserName from "../atoms/user/UserName";


interface Props {
  users: User;
  uid: string;
}

function UserData(props: Props) {
  return (
      <Link
        to={props.users.userId === props.uid ? "/mypage" : "/profile"}
        state={{ userId: props.users.userId }}
      >
        <div id={props.users.userId}
        // style={{display: "flex", gap:"3%", alignItems: "center", marginTop: "3%"}}
        className="userData"
        >
        <CommonIcon icon={props.users.icon} />
        <div>
          <span
          // style={{fontWeight: "bold"}}
          className="userData__userName">
          <UserName users={props.users} />
          </span>
          <Name users={props.users} />
        </div>
        </div>
      </Link>
  );
}

export default UserData;
