import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  CollectionReference,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import UserList from "../organisms/UserList";
import { auth, db } from "../../firebase";
import BackBtn from "../atoms/button/BackBtn";
import { User } from "../../types/types";

function MyFollow() {
  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  // const [users, setUsers] = useState<any>([]);

  //ログイン判定待ち
  const [loading, setLoading] = useState(true);

  //ログインユーザーのドキュメント参照の値
  // const [userDocRefId, setUserDocRefId] = useState<any>("");

  //followユーザーのドキュメント参照の値
  // const [followUserDocRefId, setFollowUserDocRefId] = useState<any>("");

  //ログインユーザーのfollowデータ(配列でuserIdが格納されている)
  // const [followList, setFollowList] = useState<any>("");

  //フォローしているユーザーの情報[{1人目},{2人目}....]
  const [followUsers, setFollowUsers] = useState<User[]>([]);

  //followのuserId
  // const [followUserId, setFollowUserId] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);
      setUser(currentUser);

      //userコレクション参照
      // const userCollectionRef = collection(db, "user");

      // //ログインユーザーのドキュメント参照
      // const userDocRefId = doc(userCollectionRef, currentUser.uid);
      // // setUserDocRefId(userDocRefId);

      // //上記を元にデータ取得
      // const userDocId = await getDoc(userDocRefId);
      // console.log(userDocId);

      // //データの中からfollow配列取得
      // const followUserList = userDocId.get("follow");
      // console.log(followUserList); //配列で2つ取得できてる
      // setFollowList(followUserList);

      // const userDataId = userDocId.data();
      // setUsers(userDataId);

      //follow配列内の複数のユーザーの情報を取得する＝共通することはログインユーザーにフォローされていること
      const followUserCollectionRef = query(
        collection(db, "user"),
        where("follower", "array-contains", currentUser.uid)
      )as CollectionReference<User>;

      const followUserDocId = await getDocs(followUserCollectionRef);

      const newFollowUserDocIds = followUserDocId.docs as QueryDocumentSnapshot<User>[] ;

      const followUserArray = newFollowUserDocIds.map((doc) => doc.data());

      setFollowUsers(followUserArray);
    }); //onAuth
  }, []);

  return (
    <>
      {!loading && (
        <>
        <Header show={true} />
          <BackBtn />

          <UserList
          usersData={followUsers}
          uid={user.uid}
          message="フォローしている人がいません" />
          {/* {followUsers.length > 0 ? (
            <div>
              {followUsers.map((followUser) => {
                return (
                  <User users={followUser} />
                  // <Link to="/profile" state={{ userId: followUser.userId }}>
                  //   <div id={followUser.userId}>
                  //     <CommonIcon icon={followUser.icon} />
                  //     <div>
                  //       <UserName users={followUser} />
                  //       <Name users={followUser} />
                  //     </div>
                  //   </div>
                  // </Link>
                );
              })}
            </div>
          ) : (
            <div>
              <p>フォローしている人がいません</p>
            </div>
          )} */}
          <Footer />
        </>
      )}
    </>
  );
}

export default MyFollow;
