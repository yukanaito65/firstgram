import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import { Link } from "react-router-dom";
import CommonIcon from "../atoms/icon/CommonIcon";
import { GetAllUserData } from "../data/GetAllUserData";
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

  GetAllUserData(setDataList);

  dataList.forEach((element) => {
    userDataList.push({
      userId: element.userId,
      name: element.name,
      userName: element.userName,
    });
  });

  // 「検索」クリック時にinputタグ内の文字と一致するユーザーのuserIdを配列に格納
  // 格納されたuserIdの任意の情報を取得
  const onClickSearch = () => {
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

      getDoc(resultUserDoc).then((resultUserData) => {
        const getData: any = resultUserData.data();
        if (getData) {
          userDataArr.push({
            userId: getData.userId,
            name: getData.name,
            userName: getData.userName,
            icon: getData.icon,
          });
        }
        setDataArr(userDataArr);
      });
    }
  };

  console.log(dataArr);

  return (
    <>
      <Header show={true} />
      <div className="margin"></div>
      <form className="searchpage_form">
        <SearchForm
          inputValue={searchValue}
          propsOnChange={setSearchValue}
          onClickSearch={() => onClickSearch()}
        />
      </form>
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
