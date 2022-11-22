import { onAuthStateChanged } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import RemoveFollowButton from "./RemoveFollowButton";

function AddFollowButton(props: any) {
  const [loading, setLoading] = useState(true);

  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  //ログインユーザーの情報
  const [users, setUsers] = useState<any>([]);

  const [userDocRefId, setUserDocRefId] = useState<any>("");

  const [followUserDocRefId, setFollowUserDocRefId] = useState<any>("");

  //フォローしているユーザーの情報[{1人目},{2人目}....]
  const [followUsers, setFollowUsers] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setUser(currentUser);
      setLoading(false);

      //ログインユーザーの情報取得して、usersに格納
      const userCollectionRef = collection(db, "user");

      const userDocRefId = doc(userCollectionRef, currentUser.uid);
      setUserDocRefId(userDocRefId);

      const userDocId = await getDoc(userDocRefId);

      const userDataId = userDocId.data();
      setUsers(userDataId);

      //表示されている(ボタンを押された)ユーザー情報取得して、followUsersに格納
      const followUserDocRefId = doc(userCollectionRef, props.userId);
      setFollowUserDocRefId(followUserDocRefId);

      const followUserDocId: any = await getDoc(followUserDocRefId);

      const followUserDataId = followUserDocId.data();
      setFollowUsers(followUserDataId);

      console.log(props.userId);
      console.log(userDataId);
      // console.log(userDataId.follow); //undefined
      console.log(followUserDataId);
    }); //onAuth
  }, []);

  //useEffectの中のコードよりも先に外のコードが処理される→初期表示の時にundefinedになってしまう
  console.log(props.userId);
  console.log(users);
  console.log(users.follow);
  console.log(followUsers);

  //ログインユーザーのfollow配列に今表示しているユーザーのuserIdが存在したら、フォロー外すボタン、存在しなかったらフォローするボタン
  const [followBtn, setFollowBtn] = useState<boolean>(false);

  const addFollow = async () => {
    await updateDoc(userDocRefId, {
      follow: arrayUnion(props.userId),
    });
    //ユーザーのfollower配列にログインユーザーを追加
    await updateDoc(followUserDocRefId, {
      follower: arrayUnion(user.uid),
    });
    console.log("add");
    setFollowBtn(true);
  };

  return (
    <>
      {!loading && (
        <>
          {followBtn === false ? (
            <button onClick={() => addFollow()}>フォローする</button>
          ) : (
            <RemoveFollowButton userId={props.userId} />
          )}
        </>
      )}
    </>
  );
}

export default AddFollowButton;