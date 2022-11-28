import { db } from "../../firebase";
import {
  getDoc,
  doc,
  collection,
  CollectionReference,
} from "firebase/firestore";
import { useState } from "react";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { User } from "../../types/types";

// ドキュメント名を引数に取る
interface Props {
  fieldName: any;
}

// 引数に表示したいフィールドを挿入
// export function GetLoginUserData({ fieldName }: Props) {
export function GetLoginUserData() {
  //ログイン状態を保持
  //Authenticationに登録されている情報を持つ
  const [user, setUser] = useState<any>("");

  //取得してきたデータを保持
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        console.log("ログアウト状態です");
      } else {
        //ログイン情報をuserに代入
        setUser(currentUser);

        //コレクションへの参照を取得
        const userCollectionRef = collection(
          db,
          "user"
        ) as CollectionReference<User>;

        // //上記を元にドキュメントへの参照を取得
        const userDocRefId = doc(userCollectionRef, currentUser.uid);

        // //上記を元にドキュメントのデータを取得
        const userDocId = await getDoc(userDocRefId);

        // //取得したデータから必要なものを取り出す
        // const userDataId: any = userDocId.get(fieldName);
        const userDataId: any = userDocId.data();
        setUsers(userDataId);
      }
    });
  }, []);

  return (
    // <>
    // {user ? <p>{users}</p>
    // :
    // <p>データがありません</p>}
    // </>
    { users, user }
  );
}
