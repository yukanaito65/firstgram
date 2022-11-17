import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FollowButton from "./component/atoms/button/FollowButton";
// import FollowButton from "./component/atoms/button/FollowButton";
import CommonIcon from "./component/atoms/pictures/CommonIcon";
import { auth, db } from "./firebase";

function Follower() {
  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  //ログイン判定待ち
  const [loading, setLoading] = useState(true);

  //ログインユーザーのドキュメント取得
  const [userDocRefId,setUserDocRefId] = useState<any>("");

  //followerユーザーのドキュメント参照の値
  const [followerUserDocRefId,setFollowerUserDocRefId] = useState<any>("");

  //ログインユーザーのfollowerデータ(配列でuserIdが格納されている)
  const [followerList, setFollowerList] = useState<any>("");


  //フォローされているユーザーの情報[{1人目},{2人目}....]
  const [followerUsers, setFollowerUsers] = useState<any[]>([]);


  //followのuserId
  const [followerUserId,setFollowerUserId] = useState("");

  useEffect((): any => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);
      setUser(currentUser);

      //userコレクション参照
      const userCollectionRef = collection(db, "user");

      //ログインユーザーのドキュメント参照
      const userDocRefId = doc(userCollectionRef, currentUser.uid);
      setUserDocRefId(userDocRefId);

      //上記を元にデータ取得
      const userDocId = await getDoc(userDocRefId);
      console.log(userDocId); //il

      //データの中からfollow配列取得
      const followerUserList = userDocId.get("follower");
      console.log(followerUserList);
      setFollowerList(followerUserList);


      const followerArray: any = [];
      console.log(followerArray);

      //follow配列の中のユーザー情報一人ずつ取得する
      followerUserList.map(async (userId: any) => {
        const followerUserCollectionRef = collection(db, "user");

        // userIdがfollower配列の中のuserIdと等しいドキュメントを参照
        const followerUserDocRefId = doc(followerUserCollectionRef, userId);
        console.log(followerUserDocRefId);
        setFollowerUserDocRefId(followerUserDocRefId);

        const followerUserDocId = await getDoc(followerUserDocRefId);
        console.log(followerUserDocId);

        const followerUserDataId: any = followerUserDocId.data();
        console.log(followerUserDataId);

        followerArray.push(followerUserDataId);
        setFollowerUsers(followerArray);

        console.log(followerArray);

        setFollowerUserId(userId);
      }); //map
    }); //onAuth
  }, []); //useEffect

  //  //フォローボタン  削除が機能していることは確認済み
  //  const changeFollow = async () => {
  //   if (followerList.includes(followerUserId)) {
  //     //存在すれば、followerから削除
  //     await updateDoc(userDocRefId, {
  //       follower: arrayRemove(followerUserId),
  //     });
  //     //ユーザーのfollow配列からログインユーザーを削除
  //     await updateDoc(followerUserDocRefId, {
  //       follow: arrayRemove(user.uid),
  //     });
  //   } else {
  //     //存在しなければ、ログインユーザーのfollowに追加
  //     await updateDoc(userDocRefId, {
  //       follow: arrayUnion(followerUserId),
  //     });
  //     //ユーザーのfollower配列にログインユーザーを追加
  //     await updateDoc(followerUserDocRefId, {
  //       follower: arrayUnion(user.uid),
  //     });
  //   }
  // };

  console.log(followerUsers);

  return (
    <>
    {!loading &&(
      <>
      <Link to={"/mypage"}>⬅︎</Link>
      <div>
        {followerUsers.map((followerUser) => {
          return (
            <div id={followerUser.userId}>
              <CommonIcon icon={followerUser.icon} />
              <div>
              <p>{followerUser.userName}</p>
              <p>{followerUser.name}</p>
              </div>
              {/* <button
              onClick={()=>changeFollow()}>ぼたん</button> */}
              <FollowButton />

            </div>
          );
        })}

      </div>

      </>
      )}
    </>
  );
}

export default Follower;
