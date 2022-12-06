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
import { Link } from "react-router-dom";
import GetFollowerData from "../data/GetFollowerData";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import UserList from "../organisms/UserList";
import { auth, db } from "../../firebase";
import BackBtn from "../atoms/button/BackBtn";
import { User } from "../../types/types";

function MyFollower() {
  //ログインユーザーの情報
  const [user, setUser] = useState<any>("");

  //ログイン判定待ち
  const [loading, setLoading] = useState(true);

  //ログインユーザーのドキュメント取得
  // const [userDocRefId, setUserDocRefId] = useState<any>("");

  //followerユーザーのドキュメント参照の値
  // const [followerUserDocRefId, setFollowerUserDocRefId] = useState<any>("");

  //ログインユーザーのfollowerデータ(配列でuserIdが格納されている)
  // const [followerList, setFollowerList] = useState<any>("");

  //フォローされているユーザーの情報[{1人目},{2人目}....]
  const [followerUsers, setFollowerUsers] = useState<User[]>([]);

  //followのuserId
  // const [followerUserId, setFollowerUserId] = useState("");

  // const [myFollowerData,setMyFollowerData] = useState<any>("");

  // const myDataList =()=> setMyFollowerData(GetFollowerData());

  useEffect((): any => {
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
      // console.log(userDocId); //il

      // //データの中からfollow配列取得
      // const followerUserList = userDocId.get("follower");
      // console.log(followerUserList);
      // setFollowerList(followerUserList);




      //複数のユーザーの情報を取得する＝共通していることは、ログインユーザーのことをフォローしていること
      const followerUserCollectionRef = query(
        collection(db, "user"),
        where("follow", "array-contains", currentUser.uid)
      )as CollectionReference<User>;

      const followerUserDocId = await getDocs(followerUserCollectionRef);

      const newFollowerUserDocIds = followerUserDocId.docs as QueryDocumentSnapshot<User>[];

      const followerUserArray = newFollowerUserDocIds.map((doc) => doc.data());
      setFollowerUsers(followerUserArray);
      console.log(followerUserArray);

      // setMyFollowerData(GetFollowerData());

    }); //onAuth
  }, []); //useEffect

  // console.log(followerUsers);
  // console.log(followerList);



  console.log(GetFollowerData());
// console.log(myDataList);
  // console.log(myFollowerData);


  return (
    <>
      {!loading && (
        <>
        <Header show={true} />
          {/* <Link to={"/mypage"}>⬅︎</Link> */}
          <BackBtn />
          <UserList
          usersData={followerUsers}
          uid={user.uid} />
        <Footer />
        </>
      )}
    </>
  );
}

export default MyFollower;
