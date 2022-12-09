import { User } from "../../types/types";
import UserData from "../molecules/UserData";

interface Props {
  usersData: User[];
  uid: string;
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
        <div>
          <p>フォローしている人がいません</p>
        </div>
      )}
    </>
  );
}

export default UserList;
