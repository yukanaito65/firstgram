import React, { useState } from "react";
import {
  getAuth
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import SendDM from "../molecules/SendDM";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { useLocation, Link } from "react-router-dom";
import BackBtn from "../atoms/button/BackBtn";
import PostIcon from "../atoms/icon/PostIcon";

interface State {
  userId: string;
}

function DMPage() {
  const [anotherIcon, setAnotherIcon] = useState<string>("");
  const [anotherName, setAnotherName] = useState<string>("");
  const [anotherUserName, setAnotherUserName] = useState<string>("");
  const [anotherUserId, setAnotherUserId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");
  const [MesseDisplay, setMesseDisplay] = useState<
    { userId: string; message: string; timestamp: Date }[]
  >([]);

  const location = useLocation();
  const { userId } = location.state as State;

  const auth = getAuth();
  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        <></>
      } else {
        // ログインユーザーのid取得
        const currentUserId = user.uid;
        setCurrentUser(currentUserId);

        // メッセージの箱を用意
        const MesseList: {
          userId: string;
          message: string;
          timestamp: Date;
        }[] = [];

        // ログインユーザーのデータ取得
        const ownQ = query(
          collection(db, "messages"),
          where("userId", "==", currentUserId),
          where("withUserId", "==", userId),
          limit(5)
        );
        const ownQSnapshot = await getDocs(ownQ);
        ownQSnapshot.forEach((docdata) => {
          const data = (docdata.id, " => ", docdata.data());
          MesseList.push({
            userId: data.userId,
            message: data.message,
            timestamp: data.timestamp,
          });
        });

        // 会話相手の情報取得(メッセージ表示のため)
        const anotherQ = query(
          collection(db, "messages"),
          where("userId", "==", userId),
          where("withUserId", "==", currentUserId),
          limit(5)
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
        });
        setMesseDisplay(MesseList);
    

        // 会話相手の情報取得(ユーザーデータ表示のため)
        const userDocRefId = doc(db, "user", userId);

        // //上記を元にドキュメントのデータを取得
        const userDocId = await getDoc(userDocRefId);

        // //取得したデータから必要なものを取り出す
        const userDataId: any = userDocId.data();
        if (!userDataId) {
<></>
        } else {
          setAnotherIcon(userDataId.icon);
          setAnotherName(userDataId.name);
          setAnotherUserName(userDataId.userName);
          setAnotherUserId(userDataId.userId);
        }
       
        MesseList.sort((a: any, b: any) => {
          return a.timestamp.toDate() < b.timestamp.toDate() ? -1 : 1;
        });
     
      }
    });
  }, []);

  return (
    <>
      <Header show={true} />
      <div className="dmPage">
      <div className="dmPage__top">
        <div className="dmPage__top--BackBtn">
        <BackBtn />
        </div>
        <Link to="/profile" state={{userid:anotherUserId}}>
          <div className="dmPage__top--anotherUser">
            <div className="dmPage__top--anotherUser-icon">
            <PostIcon icon={anotherIcon} />
            </div>
            <div className="dmPage__top--anotherUser-text">
              <p className="dmPage__top--anotherUser-nameText">{anotherName}</p>
              <p className="dmPage__top--anotherUser-userNameText">{anotherUserName}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="dmPage__messageWrapper">
      {MesseDisplay === undefined ? (
        <p>ローディング中...</p>
      ) : (
        MesseDisplay.map((data: any, index: any) => {
          // const timestamp = data.postDate.toDate().getTime();
          const timestamp = data.timestamp.toDate();

          const Year = timestamp.getFullYear();
          const Month = timestamp.getMonth() + 1;
          const Day = timestamp.getDate();
          const Hour = timestamp.getHours();
          const Min = timestamp.getMinutes();

          return (
            <>
              {data.userId === currentUser ? (
                <div className="dmPage__rightMesse" key={data.userId}>
                  <p className="dmPage__rightMesse--message">{data.message}</p>
                  {Min.toString().length === 1 ? (
                    <p className="dmPage__rightMesse--date">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:0{Min}
                    </p>
                  ) : (
                    <p className="dmPage__rightMesse--date">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:{Min}
                    </p>
                  )}
                </div>
              ) : (
                <div className="dmPage__leftMesse" key={data.userId}>
                  <p className="dmPage__leftMesse--message">{data.message}</p>
                  {Min.toString().length === 1 ? (
                    <p className="dmPage__leftMesse--date">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:0{Min}
                    </p>
                  ) : (
                    <p className="dmPage__leftMesse--date">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:{Min}
                    </p>
                  )}
                </div>
              )}
            </>
          );
        })
      )}
      </div>
      <SendDM />
      </div>
      <Footer />
    </>
  );
}

export default DMPage;
