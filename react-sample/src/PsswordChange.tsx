import React, { useState } from "react";
import {
  getAuth,
  deleteUser,
  updateEmail,
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
  updateDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import type { User } from "./types/types";

export function PsswordChange() {
  const auth = getAuth();
  const currentUser: any = auth.currentUser;
  const navigate = useNavigate();

  const [nowPassValue, setNowPassValue] = useState<any>("");
  const [newPassValue, setNewPassValue] = useState<any>("");
  const [cNewPassValue, setCNewPassValue] = useState<any>("");
  const [newEmailValue, setNewEmailValue] = useState<any>("");
  const [nowEmailValue, setNowEmailValue] = useState<any>("");

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("ログアウト状態です");
      } else {
        //コレクションへの参照を取得
        const userCollectionRef = collection(
          db,
          "user"
        ) as CollectionReference<User>;

        // 上記を元にドキュメントへの参照を取得
        const docData = doc(userCollectionRef, user.uid);
        console.log(docData)

        // 上記を元にドキュメントのデータを取得
        const userDocId = await getDoc(docData);
        console.log(docData)

        // 取得したデータから必要なものを取り出す
        const userDataId: any = userDocId.data();

        // inputの初期値を取得データに変更
        setNowEmailValue(userDataId.email);

        console.log("ログイン状態です");
      }
    });
  }, []);

  // パスワードの変更関数を定義(Authentication)
  const updatePassword = (
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (currentUser == null) {
        return reject();
      }

      // クレデンシャルの取得
      const credential = EmailAuthProvider.credential(
        currentUser.email || "",
        oldPassword
      );

      // メールアドレスの再認証
      reauthenticateWithCredential(currentUser, credential)
        .then((userCredential) => {
          // パスワードの更新
          firebaseUpdatePassword(userCredential.user, newPassword)
            .then(() => resolve())
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  };

  //   Authenticationを更新
  const dataUpdate: () => void = () => {
    // メアド変更
    // const credential = promptForCredentials();

    // reauthenticateWithCredential(currentUser, credential)
    updateEmail(currentUser, "tanaka123@example.com");

    // パスワード変更
    updatePassword(nowPassValue, newPassValue);
  };

  const currentUserId = currentUser?.uid;

  // データ削除
  const userDelete = async () => {
    await deleteDoc(doc(db, "user", `${currentUserId}`));
    deleteUser(currentUser)
      .then(() => {
        // データ削除しましたページに飛ぶ
        navigate("/deleteComp");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 該当するPostデータの削除
  const deletePostData = async () => {
    // currentUserの投稿を取得
    const q = query(
      collection(db, "post"),
      where("userId", "==", currentUserId)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    querySnapshot.forEach(async(doca) => {
      const data = (doca.id, " => ", doca.data())
      const id = data.postId
      await deleteDoc(doc(db, "post", id));
    });
  };

//   currentUserをフォローしているユーザーのfollow配列からcurrentUserのuserIdを消す
const followArrDelete = async() => {
    //コレクションへの参照を取得
    const userCollectionRef = collection(
        db,
        "user"
      );

      // currentUserデータを取得
      const docData = doc(userCollectionRef, currentUserId);

      // 上記を元にcurrentUserのドキュメントのデータを取得
      const userDocId = await getDoc(docData);

      // 取得したドキュメントデータからfollow配列を取得
      const followerUserIdArr: string[] = userDocId.get("follower");
      console.log(followerUserIdArr)

      followerUserIdArr.forEach(async(userId) => {
        console.log(userId)
        const userCollectionRef = collection(
            db,
            "user"
          ) as CollectionReference<User>;
    
          // currentUserのfollowerのデータ取得
          const docData = doc(userCollectionRef, userId);
          console.log(docData)
    
          // 上記を元にcurrentUserのfollowerのドキュメントのデータを取得
          const userDocId = await getDoc(docData);
          console.log(userDocId)
    
          // 取得したドキュメントデータからfollow配列を取得
          const followerUserId = userDocId.get("follow");
          console.log(followerUserId)

        //   currentUserIdを削除
          const deleteVal = currentUserId;
          const index = followerUserId.indexOf(deleteVal);
          followerUserId.splice(index,1);

          console.log(followerUserId)
        // 情報を更新
          updateDoc(docData, {
            follow: followerUserId,
          });

      })
}


  return (
    <div>
      <h1>アカウント情報変更</h1>
      <div>
        <label htmlFor="settingEmail">現在のメールアドレス</label>
        <p>{nowEmailValue}</p>
      </div>
      <div>
        <label htmlFor="settingEmail">新しいメールアドレス</label>
        <input
          type="email"
          value={newEmailValue}
          onChange={(e) => setNewEmailValue(e.target.value)}
          name="settingEmail"
          id="settingEmail"
        ></input>
      </div>
      <div>
        <label htmlFor="settingPassword">現在のパスワード</label>
        <input
          type="password"
          value={nowPassValue}
          onChange={(e) => setNowPassValue(e.target.value)}
          name="settingPassword"
          id="settingPassword"
        ></input>
      </div>

      <div>
        <label htmlFor="settingPassword">新しいパスワード</label>
        <input
          type="password"
          value={newPassValue}
          onChange={(e) => setNewPassValue(e.target.value)}
          name="settingPassword"
          id="settingPassword"
        ></input>
      </div>

      <div>
        <label htmlFor="settingCPassword">新しいパスワード（確認）</label>
        <input
          type="password"
          value={cNewPassValue}
          onChange={(e) => setCNewPassValue(e.target.value)}
          name="settingCPassword"
          id="settingCPassword"
          placeholder="確認のため再度パスワードを入力"
        ></input>
        {newPassValue.length > 0 && newPassValue !== cNewPassValue ? (
          <p>新しいパスワードと新しいパワード（確認）が一致していません</p>
        ) : (
          <></>
        )}
      </div>
      <button onClick={dataUpdate}>確定</button>
      <button onClick={userDelete}>アカウントを削除</button>
      <button onClick={followArrDelete}>テスト</button>
    </div>
  );
}

export default PsswordChange;
