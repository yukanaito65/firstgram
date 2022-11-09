import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDoc,
  doc,
  CollectionReference,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "../../types/types";

function Icon() {
  //取得してきたデータを保持
  const [users, setUsers] = useState<any>([]);

  //ログイン状態を保持
  //Authenticationに登録されている情報を持つ
  const [user, setUser] = useState<any>("");

  //ログイン判定が終わるまでリダイレクトしない
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if(!user){
        console.log("ログアウト状態です");
      } else {
      //ログイン情報をuserに代入
      setUser(user);

      //ログイン判定が終わったタイミングでloadingはfalseに変わる
      setLoading(false);

      //コレクションへの参照を取得
      const userCollectionRef = collection(db, "user") as CollectionReference<User>;

      // //上記を元にドキュメントへの参照を取得
      const userDocRefId = doc(userCollectionRef, user.uid);

      // //上記を元にドキュメントのデータを取得
      const userDocId = await getDoc(userDocRefId);

      // //取得したデータから必要なものを取り出す
      const userDataId = userDocId.data();
      // console.log(userDataId);
      setUsers(userDataId);
      }
    });
  }, []);


  return (
    <>
      {!loading && (
        <div
          className="icon-image"
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            border: "2px, lightgray",
          }}
        >
          {user ? (
              <img
                src={users.icon}
                alt="icon"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/noIcon.png`}
              alt="NoImage"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#d3d3d3",
              }}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Icon;
