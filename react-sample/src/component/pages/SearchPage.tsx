import React, { useState } from "react";
import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getDoc,
  doc,
  deleteDoc,
  collection,
  CollectionReference,
  query,
  where,
  getDocs,
  updateDoc,
  arrayRemove,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { db } from "../../firebase";

function SearchPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [dataList, setDataList] = useState<
    { userId: string; name: string; userName: string }[]
  >([]);
  const userDataArr: { userId: string; name: string; userName: string }[] = [];

  const auth = getAuth();
  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("ログアウト状態です");
      } else {
        const auth = getAuth();
        const currentUserId = auth.currentUser?.uid;

        // 取得したデータを入れる箱
        const userDataList: {
          userId: string;
          name: string;
          userName: string;
        }[] = [];

        // 取得データ指定
        const userQuery = query(collection(db, "user"));

        // 上記を元にドキュメントのデータを取得
        const userDocId = await getDocs(userQuery);

        // 取得したデータからnameとuserNameとuserIdを取り出し配列にpushする
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

  const onClickSearch = async () => {
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

    // 重複のない検索結果ユーザーIDの配列
    const newResultUserList = newSearchResultList;
    console.log(newResultUserList)

    newResultUserList.forEach(async (userId) => {
      const resultUserDoc: any = doc(db, "user", userId);

      const resultUserData: any[] | unknown = await getDocs(resultUserDoc);
      console.log(resultUserData)

      //上記を元にデータの中身を取り出す。map()を使えるようにする。
      // resultUserData.forEach((docdata) => {
      //   const data: any = (docdata.id, " => ", docdata.data());
      //   console.log(data)
      //   if(data) {
      //   userDataArr.push({
      //     userId: data.userId,
      //     name: data.name,
      //     userName: data.userName,
      //   });
      // }
      // });
    });
    setSearchValue("");
  };

  return (
    <>
      <input
        type="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <p>{searchValue}</p>

      <button onClick={onClickSearch}>検索</button>
      {userDataArr.map(() => {
        <>
          <img src={icon} />
          <p>{name}</p>
          <p>{userName}</p>
        </>;
      })}
    </>
  );
}

export default SearchPage;
