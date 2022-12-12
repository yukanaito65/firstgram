import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import {
  collection,
  getDoc,
  doc,
  CollectionReference,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "../../../types/types";

function Icon() {
  //取得してきたデータを保持
  const [users, setUsers] = useState<User | undefined>();

  //ログイン状態を保持
  //Authenticationに登録されている情報を持つ
  const [user, setUser] = useState<any>("");

  //ログイン判定が終わるまでリダイレクトしない
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        <>
        </>
      } else {
        //ログイン情報をuserに代入
        setUser(user);

        //ログイン判定が終わったタイミングでloadingはfalseに変わる
        setLoading(false);

        //コレクションへの参照を取得
        const userCollectionRef = collection(
          db,
          "user"
        ) as CollectionReference<User>;

        // //上記を元にドキュメントへの参照を取得
        const userDocRefId = doc(userCollectionRef, user.uid);

        // //上記を元にドキュメントのデータを取得
        const userDocId = await getDoc(userDocRefId);

        // //取得したデータから必要なものを取り出す
        const userDataId = userDocId.data();
        setUsers(userDataId);
      }
    });
  }, []);

  return (
    <>
      {!loading && (
        <div className="icon-image">
          {user && users?.icon !== "" ? (
            <img
              className="icon-image__img"
              src={users?.icon}
              alt="icon"
            />
          ) : (
            <img
              className="noIconImage"
              src={`${process.env.PUBLIC_URL}/noIcon.png`}
              alt="NoImage"
            />
          )}
        </div>
      )}
    </>
  );
}

export default Icon;
