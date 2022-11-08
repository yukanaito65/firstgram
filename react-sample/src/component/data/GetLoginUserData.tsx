import { db } from "../../firebase";
import {
  getDoc,
  doc,
  collection,
} from "firebase/firestore";
import { useState } from "react";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";

// ドキュメント名を引数に取る
interface Props {
    fieldName: string
  }

  // 引数に表示したいフィールドを挿入
export function GetLoginUserData({fieldName}:Props) {
    //取得してきたデータを保持
  const [users, setUsers] = useState<any>([]);

  //ログイン状態を保持
  //Authenticationに登録されている情報を持つ
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if(!user){
        console.log("ログアウト状態です");
      } else {
      //ログイン情報をuserに代入
      setUser(user);

      //コレクションへの参照を取得
      const userCollectionRef = collection(db, "user")

      // //上記を元にドキュメントへの参照を取得
      const userDocRefId = doc(userCollectionRef, user.uid);

      // //上記を元にドキュメントのデータを取得
      const userDocId = await getDoc(userDocRefId);

      // //取得したデータから必要なものを取り出す
      const userDataId:any = userDocId.data();
      console.log(userDataId.fieldName);
      setUsers(userDataId);
      }
    });
  }, []);

  return (
    <>
    {user ? <p>{users.fieldName}</p>
    :
    <p>データがありません</p>}
    </>
  );
            }
