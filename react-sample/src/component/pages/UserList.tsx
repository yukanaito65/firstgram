import React from "react";
import { User } from "../../types/types";
import UserData from "../molecules/UserData";

function UserList(props: any) {
  return (
    <>
      {props.usersData.length > 0 ? (
        <div>
          {props.usersData.map((followUser: User) => {
            return (
            <UserData
            users={followUser}
            uid={props.uid}
             />
            );
          })}
        </div>
      ) : (
        <div>
          <p>フォローしている人がいません</p>
        </div>
      )}
    </>
  );
}

export default UserList;
