import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getDoc, doc, collection, query, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { db } from "../../firebase";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import { Link } from "react-router-dom";
import CommonIcon from "../atoms/icon/CommonIcon";
import { NGetLoginUserData } from "../data/NGetLoginUserData";
import { GetAllUserData } from "../data/GetAllUserData";
import { DocumentData } from "firebase/firestore";
import { async } from "@firebase/util";
import SearchForm from "../molecules/SearchForm";

// 流れ
// まず前userのuserNameとnameとuserIdを取得し配列に入れる
// その中からinputタグ内の文字を含むuserを配列に格納する
// 配列内で被ってるユーザーがいる可能性があるため、重複を消す
// 上記の配列をforEachで回しデータを取得し、それらを新たな配列に格納する
// 上記の配列を使ってmapで回して表示する

const auth = getAuth();
const currentUserId = auth.currentUser?.uid;
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

  // 取得した全userのデータを入れる箱
  const userDataList: {
    userId: string;
    name: string;
    userName: string;
  }[] = [];

  // const getAllUserDataArr: DocumentData[] = GetAllUserData();

  // getAllUserDataArr.forEach((element) => {
  //   userDataList.push({
  //     userId: element.userId,
  //     name: element.name,
  //     userName: element.userName,
  //   });
  // });

  // console.log(getAllUserDataArr)

  // まずuseEffect内で前userデータのuserNameとnameとtonametouserIdを取得
  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("ログアウト状態です");
      } else {

        const userQuery = query(collection(db, "user"));
        getDocs(userQuery).then((data) => {
          data.forEach((docdata) => {
            // console.log(docdata.data());
            const data = (docdata.id, " => ", docdata.data());
            userDataList.push({
              userId: data.userId,
              name: data.name,
              userName: data.userName,
            });
          });
          console.log(userDataList);
          setDataList(userDataList);
        });
        console.log(dataList);
      }
    });
  }, []);

  // 「検索」クリック時にinputタグ内の文字と一致するユーザーのuserIdを配列に格納
  // 格納されたuserIdの任意の情報を取得
  const onClickSearch = async () => {
    // 検索に引っかかったuserのuserIdを格納
    const searchResultList: string[] = [];
    dataList.forEach((user) => {
      const userName = user.userName;
      const name = user.name;
      const userId = user.userId;
      if (userName.includes(searchValue)) {
        searchResultList.push(userId);
      } else if (name.includes(searchValue)) {
        searchResultList.push(userId);
      }
    });

    // 検索に引っかかったuserの任意情報を格納
    const userDataArr: {
      userId: string;
      name: string;
      userName: string;
      icon: string;
    }[] = [];
    for (const userId of searchResultList) {
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
    }
    setDataArr(userDataArr);
  };

  console.log(dataArr);

  return (
    <>
      <Header show={true} />
      <div className="margin"></div>
      <form className="searchpage_form">
        <div className="searchpage_form_wrapper">
          <input
            className="searchpage_form_input"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="検索ワードを入力"
          />
          <button
            type="button"
            className="searchpage_form_btn"
            onClick={() => onClickSearch()}
          >
            検索
          </button>
        </div>
      </form>
      {/* <SearchForm props={onClickSearch()} /> */}
      {dataArr.length > 0 ? (
        dataArr.map((a) => {
          return (
            <>
              <Link
                to={a.userId === currentUserId ? "/mypage" : "/profile"}
                state={{ userId: a.userId }}
              >
                <CommonIcon icon={a.icon} />
                <p>{a.name}</p>
                <p>{a.userName}</p>
              </Link>
            </>
          );
        })
      ) : (
        <div className="no_matchUser">
          <p>該当するユーザーがいません</p>
        </div>
      )}
      <Footer />
    </>
  );
}

export default SearchPage;
