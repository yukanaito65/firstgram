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

          // メッセージの箱を用意
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
            timestamp: data.timestamp,
          });
        });

        // 会話相手のデータ取得
        const anotherQ = query(
          collection(db, "messages"),
          where("userId", "==", "w2wZzrOOetPiGTvaE0nk86zVo3k1"),
          orderBy("timestamp")
        );
        const anotherQSnapshot = await getDocs(anotherQ);
        anotherQSnapshot.forEach((docdata) => {
          const data = (docdata.id, " => ", docdata.data());
          // const timestamp = data.timestamp.toDate();
          MesseList.push({
            userId: data.userId,
            message: data.message,
            timestamp: data.timestamp,
          });
          console.log(MesseList)
        });
        setMesseDisplay(MesseList)
        console.log(MesseList)

        // 会話相手の情報取得
        const userDocRefId = doc(db, "user", "w2wZzrOOetPiGTvaE0nk86zVo3k1");

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
        MesseList.sort((a: any, b: any) => {
          return a.postDate.toDate() < b.postDate.toDate()  ? -1 : 1;
          });
          console.log(MesseList)
      }
    });
  }, []);

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
      : MesseDisplay.map((data:any,index:any) => {
        // const timestamp = data.postDate.toDate().getTime();
        console.log(data.timestamp);
        const timestamp = data.timestamp.toDate();
        console.log(timestamp);

        const Year = timestamp.getFullYear();
        const Month = timestamp.getMonth() + 1;
        const Day = timestamp.getDate();
        const Hour = timestamp.getHours();
        const Min = timestamp.getMinutes();

        return (
          <>
          {data.userId === currentUser ? 
          <div className="right" key={data.userId}>
            <p>{data.message}</p>
            <p>
              {Year}.{Month}.{Day}&nbsp;{Hour}：{Min}
            </p>
          </div>
          :
          <div className="left" key={data.userId}>
            <p>{data.message}</p>
            <p>
            {Year}.{Month}.{Day}&nbsp;{Hour}：{Min}
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
