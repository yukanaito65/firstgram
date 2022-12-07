import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  collection,
  CollectionReference,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { User } from "../../../types/types";
import AddFollowButton from "./AddFollowButton";

interface Props {
  userId: string;
  followerCount: number;
  setFollowerCount: React.Dispatch<React.SetStateAction<number>>;
}
function RemoveFollowButton(props: Props) {
  const [loading, setLoading] = useState(true);

  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  //ログインユーザーの情報
  const [users, setUsers] = useState<any>([]);

  const [userDocRefId, setUserDocRefId] = useState<any>("");

  const [followUserDocRefId, setFollowUserDocRefId] = useState<any>("");

  //フォローしているユーザーの情報[{1人目},{2人目}....]
  // const [followUsers, setFollowUsers] = useState<any>([]);

  // const [followerList, setFollowerList] = useState<any>({follower: []})

  // const [profileFollowerCount, setProfileFollowerCount] = useState<any>(props.followerCount);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setUser(currentUser);
      setLoading(false);

      //ログインユーザーの情報取得して、usersに格納
      const userCollectionRef = collection(
        db,
        "user"
      ) as CollectionReference<User>;

      const userDocRefId = doc(userCollectionRef, currentUser.uid);
      setUserDocRefId(userDocRefId);

      const userDocId = await getDoc(userDocRefId);

      const userDataId = userDocId.data();
      setUsers(userDataId);

      //表示されている(ボタンを押された)ユーザー情報取得して、followUsersに格納
      const followUserDocRefId = doc(userCollectionRef, props.userId);
      setFollowUserDocRefId(followUserDocRefId);

      // const followUserDocId = await getDoc(followUserDocRefId);

      // const followUserDataId = followUserDocId.data();
      // setFollowUsers(followUserDataId);
      // setFollowerList(followUserDataId?.follower);

      // setProfileFollowerCount(profileFollowerCount)

      // console.log(props.userId);
      // console.log(userDataId);
      // console.log(userDataId.follow); //undefined
      // console.log(followUserDataId);
    }); //onAuth
  }, []);

  //useEffectの中のコードよりも先に外のコードが処理される→初期表示の時にundefinedになってしまう
  // console.log(props.userId);
  // console.log(users);
  // console.log(users.follow); //undefined
  // console.log(followUsers);

  //ログインユーザーのfollow配列に今表示しているユーザーのuserIdが存在したら、フォロー外すボタン、存在しなかったらフォローするボタン
  const [followBtn, setFollowBtn] = useState<boolean>(true);
  // const [followerNum, setFollowerNum] = useState<number>(props.followerList);

  const removeFollow = async () => {
    await updateDoc(userDocRefId, {
      follow: arrayRemove(props.userId),
    });
    //ユーザーのfollower配列からログインユーザーを削除
    await updateDoc(followUserDocRefId, {
      follower: arrayRemove(user.uid),
    });
    console.log("remove");
    //削除したらtrueにする
    setFollowBtn(false);
    // setFollowerNum(props.followerNum);
    // setProfileFollowerCount(profileFollowerCount);
    props.setFollowerCount(props.followerCount - 1);
  };

  return (
    <>
      {!loading && (
        <>
          {followBtn === true ? (
            <>
              {/* <span style={{position: "absolute", top: "20%", left: "75%" }}>
            <FollowerCount
              followerList={followerList}
              link={"/follower"}
              userId={props.userId}
              uid={user.uid}
              />
              </span> */}
              {/* {props.followerCount} */}
              <button onClick={() => removeFollow()} className="btn">
                フォロー中
              </button>
              {/* <p>{followerList.length}</p> */}
            </>
          ) : (
            <AddFollowButton
              userId={props.userId}
              followerCount={props.followerCount}
              setFollowerCount={props.setFollowerCount}
            />
          )}
        </>
      )}
    </>
  );
}

export default RemoveFollowButton;
