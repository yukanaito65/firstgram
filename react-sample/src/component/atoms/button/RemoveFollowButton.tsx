import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import FollowerCount from "../user/FollowerCount";
import AddFollowButton from "./AddFollowButton";

function RemoveFollowButton(props: any) {
  const [loading, setLoading] = useState(true);

  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  //ログインユーザーの情報
  const [users, setUsers] = useState<any>([]);

  const [userDocRefId, setUserDocRefId] = useState<any>("");

  const [followUserDocRefId, setFollowUserDocRefId] = useState<any>("");

  //フォローしているユーザーの情報[{1人目},{2人目}....]
  const [followUsers, setFollowUsers] = useState<any[]>([]);

  const [followerList, setFollowerList] = useState<any>({follower: []})

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
      setFollowerList(followUserDataId.follower);

      console.log(props.userId);
      console.log(userDataId);
      // console.log(userDataId.follow); //undefined
      console.log(followUserDataId);
    }); //onAuth
  }, []);

  //useEffectの中のコードよりも先に外のコードが処理される→初期表示の時にundefinedになってしまう
  console.log(props.userId);
  console.log(users);
  console.log(users.follow); //undefined
  console.log(followUsers);

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
  };

  return (
    <>
      {!loading && (
        <>


          {followBtn === true ? (
            <>
            <button onClick={() =>{
               removeFollow()
              //  window.location.reload()
              }
              }>フォロー中</button>
              {/* <p>{followerList.length}</p> */}
              <FollowerCount
              followerList={followerList}
              link={"/follower"}
              userId={props.userId}
              uid={user.uid}
              />
              </>
          ) : (
            <AddFollowButton userId={props.userId} />
          )}
        </>
      )}
    </>
  );
}

export default RemoveFollowButton;
