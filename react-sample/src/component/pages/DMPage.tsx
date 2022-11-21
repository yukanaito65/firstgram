import React, { useState } from "react";
import {
  getAuth,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { collection, query, where, getDocs, orderBy, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import SendDM from "../pages/SendDM";
import { Link, useNavigate } from 'react-router-dom';


function DMPage() {
  const [anotherIcon, setAnotherIcon] =
    useState<string>("");
    const [anotherName, setAnotherName] =
    useState<string>("");
    const [anotherUserName, setAnotherUserName] =
    useState<string>("");
    const [currentUser, setCurrentUser] =
    useState<string>("");
  const [MesseDisplay, setMesseDisplay] =
    useState<{ userId: string; message: string; timestamp: Date }[]>([]);

  const auth = getAuth();
  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("ログアウト状態です");
      } else {
        // ログインユーザーのid取得
        const currentUserId = user.uid;
        setCurrentUser(currentUserId)
        console.log(`ログインユーザーID : ${currentUserId}`);

          // エッセー時の箱を用意
        const MesseList: { userId: string; message: string; timestamp: Date }[] = [];

        // ログインユーザーのデータ取得
        const ownQ = query(
          collection(db, "messages"),
          where("userId", "==", currentUserId),
          orderBy("timestamp")
        );
        const ownQSnapshot = await getDocs(ownQ);
        ownQSnapshot.forEach((docdata) => {
          const data = (docdata.id, " => ", docdata.data());
          const timestamp = data.timestamp.toDate();
          MesseList.push({
            userId: data.userId,
            message: data.message,
            timestamp: timestamp,
          });
        });

        // 会話相手のデータ取得
        const anotherQ = query(
          collection(db, "messages"),
          where("userId", "==", "1s4kEXhN0gTei2bH7KROlrEcJdr2"),
          orderBy("timestamp")
        );
        const anotherQSnapshot = await getDocs(anotherQ);
        anotherQSnapshot.forEach((docdata) => {
          const data = (docdata.id, " => ", docdata.data());
          const timestamp = data.timestamp.toDate();
          MesseList.push({
            userId: data.userId,
            message: data.message,
            timestamp: timestamp,
          });
          console.log(MesseList)
        });
        setMesseDisplay(MesseList)
        console.log(MesseList)

        // 会話相手の情報取得
        const userDocRefId = doc(db, "user", "1s4kEXhN0gTei2bH7KROlrEcJdr2");

        // //上記を元にドキュメントのデータを取得
        const userDocId = await getDoc(userDocRefId);
        console.log(userDocId);

        // //取得したデータから必要なものを取り出す
        const userDataId: any = userDocId.data();
        if (!userDataId) {
          console.log("データがありません");
        } else {
          setAnotherIcon(userDataId.icon);
          setAnotherName(userDataId.name);
          setAnotherUserName(userDataId.userName);
        }

      }
    });
  }, []);
  // const navigate = useNavigate();
  // const goBack = () => {
  //   navigate.goBack()
  // }

  return (
    <>
    <Link to={"/mypage"}>
    <div>&lt;</div>
    </Link>
    <div>
      <img src={anotherIcon} width={70} />
      <p>{anotherName}</p>
      <p>{anotherUserName}</p>
    </div>
      {MesseDisplay === undefined ?
      <p>ローディング中...</p>
      : MesseDisplay.map((messe) => {
        const Year = messe.timestamp.getFullYear();
        const Month = messe.timestamp.getMonth() + 1;
        const Day = messe.timestamp.getDate();
        const Hour = messe.timestamp.getHours();
        const Min = messe.timestamp.getMinutes();

        return (
          <>
          {messe.userId === currentUser ? 
          <div className="right" key={messe.userId}>
            <p>{messe.message}</p>
            <p>
              {Year}年{Month}月{Day}日{Hour}時{Min}分
            </p>
          </div>
          :
          <div className="left" key={messe.userId}>
            <p>{messe.message}</p>
            <p>
              {Year}年{Month}月{Day}日{Hour}時{Min}分
            </p>
          </div>
      }
          </>
        );
      })}
      <SendDM />
    </>
  );
}

export default DMPage;
