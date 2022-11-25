import React, { useState } from "react";
import {
  getAuth,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import {
  getDoc,
  doc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { db } from "../../firebase";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import { useLocation } from "react-router-dom";


// 流れ
// まず前userのuserNameとnameとuserIdを取得し配列に入れる
// その中からinputタグ内の文字を含むuserを配列に格納する
// 配列内で被ってるユーザーがいる可能性があるため、重複を消す
// 上記の配列をforEachで回しデータを取得し、それらを新たな配列に格納する
// 上記の配列を使ってmapで回して表示する

interface State {
  userId: string;
} 


function SearchPage() {
  // inputタグ内の状態管理
  const [searchValue, setSearchValue] = useState<string>("");

  // 全userのデータを管理
  const [dataList, setDataList] = useState<
    { userId: string; name: string; userName: string }[]
  >([]);

    // 最終的にmapで回して表示する検索結果のuser情報の管理
  const [dataArr, setDataArr] = useState<
    { userId: string; name: string; userName: string; icon: string }[]
  >([]);

  // 検索結果のデータの表示/非表示を管理
  const [displaySwitch, setDisplaySwitch] = useState<boolean>(false);

  // 1発目に検索結果を出す
  const  [display, setDisplay] = useState<number>(1)

// postlookからデータを持ってくる
const location = useLocation();
  // const { userId } = location.state as State;

  const auth = getAuth();
  // まずuseEffect内で前userデータのuserNameとnameとtonametouserIdを取得
  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("ログアウト状態です");
      } else {
        // 取得した全userのデータを入れる箱
        const userDataList: {
          userId: string;
          name: string;
          userName: string;
        }[] = [];
        const userQuery = query(collection(db, "user"));
        const userDocId = await getDocs(userQuery);
        userDocId.forEach((docdata) => {
          const data = (docdata.id, " => ", docdata.data());
          userDataList.push({
            userId: data.userId,
            name: data.name,
            userName: data.userName,
          });
        });
        setDataList(userDataList);
        console.log(userDataList);
        console.log(dataList);
      }
    });
  }, []);

  // 「検索」クリック時にinputタグ内の文字と一致するユーザーのuserIdを配列に格納
  // 格納されたuserIdの任意の情報を取得
  const onClickSearch = async () => {
    // 検索に引っかかったuserのuserIdを格納（重複可能性あり）
    const searchResultList: string[] = [];
    dataList.forEach((user) => {
      const userName = user.userName;
      const name = user.name;
      const userId = user.userId;
      if (userName.includes(searchValue)) {
        searchResultList.push(userId);
      }
      if (name.includes(searchValue)) {
        searchResultList.push(userId);
      }
    });
    const newSearchResultList = Array.from(new Set(searchResultList));

    // 重複のない検索結果ユーザーIDの配列に変換
    const newResultUserList = newSearchResultList;
    console.log(newResultUserList);

    // 検索に引っかかったuserの任意情報を格納
    const userDataArr: {
      userId: string;
      name: string;
      userName: string;
      icon: string;
    }[] = [];
    newResultUserList.forEach(async (userId) => {
      console.log(1);
      const resultUserDoc = doc(db, "user", userId);
      console.log(resultUserDoc);

      const resultUserData = await getDoc(resultUserDoc);
      console.log(resultUserData);

      const getData: any = resultUserData.data();
      console.log(getData);
      if (getData) {
        userDataArr.push({
          userId: getData.userId,
          name: getData.name,
          userName: getData.userName,
          icon: getData.icon,
        });
      }
      console.log(userDataArr);
    });
    const a = userDataArr;
    console.log(a);
    const b = true;
    setDataArr(a);
    setDisplaySwitch(b);
    setDisplay(display + 1)
  };

  return (
    <>
    <Header show={true} />
    <div className="margin"></div>
    <form className="searchpage_form">
      <div className="dmpage_form_wrapper">
      <input
      className="searchpage_form_input"
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="検索ワードを入力"
      />
      <button
      className="dampage_form_btn"
      onClick={() => onClickSearch()}>検索</button>
      </div>
      </form>
      {console.log(dataArr)}
      {dataArr.length > 0 &&
      displaySwitch ? (
        dataArr.map((a) => {
          return(
          <>
            <img src={a.icon} alt="ユーザーアイコン" />
            <p>{a.name}</p>
            <p>{a.userName}</p>
          </>
          )
        })
      ) : (<p>該当するユーザーがいません</p>)
      }
      <Footer />
    </>
  );
}

export default SearchPage;
