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
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import { useLocation, Link } from "react-router-dom";

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
        console.log("ログアウト状態です");
      } else {
        // ログインユーザーのid取得
        const currentUserId = user.uid;
        setCurrentUser(currentUserId);
        console.log(`ログインユーザーID : ${currentUserId}`);

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
          console.log(MesseList);
        });
        setMesseDisplay(MesseList);
        console.log(MesseList);

        // 会話相手の情報取得(ユーザーデータ表示のため)
        const userDocRefId = doc(db, "user", userId);

        // //上記を元にドキュメントのデータを取得
        const userDocId = await getDoc(userDocRefId);

        // //取得したデータから必要なものを取り出す
        const userDataId: any = userDocId.data();
        if (!userDataId) {
          console.log("データがありません");
        } else {
          setAnotherIcon(userDataId.icon);
          setAnotherName(userDataId.name);
          setAnotherUserName(userDataId.userName);
          setAnotherUserId(userDataId.userId);
        }
        console.log(MesseList);
        MesseList.sort((a: any, b: any) => {
          return a.timestamp.toDate() < b.timestamp.toDate() ? -1 : 1;
        });
        console.log(MesseList);
      }
    });
  }, []);

  // backボタン
  const navigate = useNavigate();
  const backBtn = () => {
    navigate(-1);
  };

  return (
    <>
      <Header show={true} />
      <div className="dmpage_top">
        <div onClick={backBtn}>
          <IoIosArrowBack
            color="rgb(38, 38, 38)"
            size={35}
            className="dmpage_back_btn"
          />
        </div>
        <Link to="/profile" state={{userid:anotherUserId}}>
          <div className="dm_another_info">
            <img src={anotherIcon} width={50} alt={anotherName} />
            <div className="dm_another_text">
              <p className="dm_another_name">{anotherName}</p>
              <p className="dm_another_userName">{anotherUserName}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="margin"></div>
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
                <div className="dm_right" key={data.userId}>
                  <p className="dm_message_right">{data.message}</p>
                  {Min.toString().length === 1 ? (
                    <p className="dm_date_right">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:0{Min}
                    </p>
                  ) : (
                    <p className="dm_date_right">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:{Min}
                    </p>
                  )}
                </div>
              ) : (
                <div className="dm_left" key={data.userId}>
                  <p className="dm_message_left">{data.message}</p>
                  {Min.toString().length === 1 ? (
                    <p className="dm_date_right">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:0{Min}
                    </p>
                  ) : (
                    <p className="dm_date_right">
                      {Year}.{Month}.{Day}&nbsp;{Hour}:{Min}
                    </p>
                  )}
                </div>
              )}
            </>
          );
        })
      )}
      <div className="dmpage_margin_20"></div>
      <SendDM />

      <Footer />
    </>
  );
}

export default DMPage;
