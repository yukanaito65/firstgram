import { User } from "../../types/types";
import UserData from "../molecules/UserData";

interface Props {
  usersData: User[];
  uid: string;
  message:string;
}

function UserList(props: Props) {
  return (
    <>
      {props.usersData.length > 0 ? (
        <div className = "userList">
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
        <div className="userList__message">
          <p>{props.message}</p>
        </div>
      )}
    </>
  );
}

export default UserList;
