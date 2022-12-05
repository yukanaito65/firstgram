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
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import type { User } from "../../types/types";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { async } from "@firebase/util";

export function PsswordChange() {
  const auth = getAuth();
  const currentUser: any = auth.currentUser;
  const currentUserId = currentUser?.uid;
  console.log(currentUser);
  const navigate = useNavigate();

  const [nowPassValue, setNowPassValue] = useState<any>("");
  const [newPassValue, setNewPassValue] = useState<any>("");
  const [cNewPassValue, setCNewPassValue] = useState<any>("");
  const [nowEmailValue, setNowEmailValue] = useState<any>("");
  const [isRevealNowPassword, setIsRevealNowPassword] = useState(false);
  const [isRevealNewPassword, setIsRevealNewPassword] = useState(false);
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, (user) => {
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
        console.log(docData);

        // 上記を元にドキュメントのデータを取得
        getDoc(docData).then((userDocId) => {
          // 取得したデータから必要なものを取り出す
          const userDataId: any = userDocId.data();

          // inputの初期値を取得データに変更
          setNowEmailValue(userDataId.email);
        });
        console.log("ログイン状態です");
        console.log(docData);
      }
    });
  }, []);

  // // パスワードの変更関数を定義(Authentication)
  // const updatePassword = (
  //   oldPassword: string,
  //   newPassword: string
  // ): Promise<void> => {
  //   return new Promise((resolve, reject) => {
  //     if (currentUser == null) {
  //       return reject();
  //     }

  //     // クレデンシャルの取得
  //     const credential = EmailAuthProvider.credential(
  //       currentUser.email || "",
  //       oldPassword
  //     );

  //     // メールアドレスの再認証
  //     reauthenticateWithCredential(currentUser, credential)
  //       .then((userCredential) => {
  //         // パスワードの更新
  //         firebaseUpdatePassword(userCredential.user, newPassword)
  //           .then(() => resolve())
  //           .catch((error) => reject(error));
  //       })
  //       .catch((error) => reject(error));
  //   });
  // };

  // //   Authenticationを更新
  // const dataUpdate: () => void = () => {
  //   // パスワード変更
  //   updatePassword(nowPassValue, newPassValue);
  // };

  // // 該当するPostデータの削除
  // const deletePostData = () => {
  //   // currentUserの投稿を取得
  //   const q = query(
  //     collection(db, "post"),
  //     where("userId", "==", currentUserId)
  //   );
  //   getDocs(q).then((querySnapshot: any) => {
  //     for(const docdata of querySnapshot) {
  //       const data = (docdata.id, " => ", docdata.data());
  //       const id = data.postId;
  //       deleteDoc(doc(db, "post", id));
  //     }
  //     });
  // };

  // //   currentUserをフォローしているユーザーのfollow配列からcurrentUserのuserIdを消す
  // const followArrDelete = async () => {
  //   //コレクションへの参照を取得
  //   const userCollectionRef = collection(db, "user");

  //   // currentUserデータを取得
  //   const currentUserData = doc(userCollectionRef, currentUserId);

  //   // 上記を元にcurrentUserのドキュメントのデータを取得
  //   getDoc(currentUserData).then((currentUserDocData) => {
  //     // 取得したドキュメントデータからfollow配列を取得
  //   const followerUserIdArr: string[] = currentUserDocData.get("follower");
  //   console.log(followerUserIdArr);

  //   for (const followerUserId of followerUserIdArr) {
  //     const followerUserData = doc(db, "user", followerUserId);
  //     updateDoc(followerUserData, {
  //       follow: arrayRemove(currentUserId),
  //     });
  //   }
  //   })
  // };

  // // currentUserがフォローしているユーザーのfollower配列からcurrentUserのuserIdを消す
  // const followerArrDelete = () => {
  //   //コレクションへの参照を取得
  //   const userCollectionRef = collection(db, "user");

  //   // currentUserデータを取得
  //   const currentUserData = doc(userCollectionRef, currentUserId);

  //   // 上記を元にcurrentUserのドキュメントのデータを取得
  //   getDoc(currentUserData).then((currentUserDocData) => {
  //     // 取得したドキュメントデータからfollow配列を取得
  //   const followUserIdArr: string[] = currentUserDocData.get("follow");

  //   for (const followUserId of followUserIdArr) {
  //     const followUserData = doc(db, "user", followUserId);
  //     updateDoc(followUserData, {
  //       follower: arrayRemove(currentUserId),
  //     });
  //   }
  //   });

  // };

  // // データ削除
  // const userDelete = () => {
  //   deleteDoc(doc(db, "user", `${currentUserId}`)).then(() => {
  //     deleteUser(currentUser);
  //     deletePostData();
  //   })
  //     .then(() => {

  //       // followArrDelete();
  //       // followerArrDelete();
  //       // // データ削除しましたページに飛ぶ
  //       // navigate("/deleteComp");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const userDeleteAlert = () => {
  //   if (window.confirm("本当にアカウントを削除しますか")) {
  //     userDelete();
  //   } else {
  //     console.log("キャンセルボタンが押されました。");
  //   }
  // };

  // // パスワードの表示/非表示
  // const toggleNowPassword = () => {
  //   setIsRevealNowPassword((prevState) => !prevState);
  // };
  // const toggleNewPassword = () => {
  //   setIsRevealNewPassword((prevState) => !prevState);
  // };

  // const toggleConfirmPassword = () => {
  //   setIsRevealConfirmPassword((prevState) => !prevState);
  // };

  // // backボタン
  // const backBtn = () => {
  //   navigate(-1);
  // };

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
    // パスワード変更
    updatePassword(nowPassValue, newPassValue);
  };

  // const currentUserId = currentUser?.uid;

  // 該当するPostデータの削除
  const deletePostData = async () => {
    // currentUserの投稿を取得
    const q = query(
      collection(db, "post"),
      where("userId", "==", currentUserId)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach(async (docdata) => {
      const data = (docdata.id, " => ", docdata.data());
      const id = data.postId;
      await deleteDoc(doc(db, "post", id));
    });
    // getDocs(q).then((querySnapshot:any) => {
    //   for(const docdata of querySnapshot) {
    //     const data = (docdata.id, " => ", docdata.data());
    //     const id = data.postId;
    //     deleteDoc(doc(db, "post", id));
    //   }
    // })
  };

  //   currentUserをフォローしているユーザーのfollow配列からcurrentUserのuserIdを消す
  const followArrDelete = () => {
    //コレクションへの参照を取得
    const userCollectionRef = collection(db, "user");

    // currentUserデータを取得
    const currentUserData = doc(userCollectionRef, currentUserId);

    // 上記を元にcurrentUserのドキュメントのデータを取得
    getDoc(currentUserData).then((currentUserDocData) => {
      // 取得したドキュメントデータからfollow配列を取得
      const followerUserIdArr: string[] = currentUserDocData.get("follower");
      console.log(followerUserIdArr);

      for (const followerUserId of followerUserIdArr) {
        const followerUserData = doc(db, "user", followerUserId);
        updateDoc(followerUserData, {
          follow: arrayRemove(currentUserId),
        });
      }
    });
  };

  // currentUserがフォローしているユーザーのfollower配列からcurrentUserのuserIdを消す
  const followerArrDelete = () => {
    //コレクションへの参照を取得
    const userCollectionRef = collection(db, "user");

    // currentUserデータを取得
    const currentUserData = doc(userCollectionRef, currentUserId);

    // 上記を元にcurrentUserのドキュメントのデータを取得
    getDoc(currentUserData).then((currentUserDocData) => {
      // 取得したドキュメントデータからfollow配列を取得
      const followUserIdArr: string[] = currentUserDocData.get("follow");

      for (const followUserId of followUserIdArr) {
        const followUserData = doc(db, "user", followUserId);
        updateDoc(followUserData, {
          follower: arrayRemove(currentUserId),
        });
      }
    });
  };

  // const dataDelete = () => {
  //   // TODO(you): prompt the user to re-provide their sign-in credentials
  //   const credential = promptForCredentials();

  //   reauthenticateWithCredential(user, credential)
  //     .then(() => {
  //       // User re-authenticated.
  //     })
  //     .catch((error) => {
  //       // An error ocurred
  //       // ...
  //     });
  // };

  // データ削除
  const userDelete = async () => {
    await deleteDoc(doc(db, "user", `${currentUserId}`));
    deleteUser(currentUser)
      .then(() => {
        deletePostData();
        followArrDelete();
        followerArrDelete();
        // データ削除しましたページに飛ぶ
        navigate("/deleteComp");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userDeleteAlert = () => {
    if (window.confirm("本当にアカウントを削除しますか")) {
      userDelete();
    } else {
      console.log("キャンセルボタンが押されました。");
    }
  };

  // パスワードの表示/非表示
  const toggleNowPassword = () => {
    setIsRevealNowPassword((prevState) => !prevState);
  };
  const toggleNewPassword = () => {
    setIsRevealNewPassword((prevState) => !prevState);
  };

  const toggleConfirmPassword = () => {
    setIsRevealConfirmPassword((prevState) => !prevState);
  };

  // backボタン
  const backBtn = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header show={true} />
      <h1 className="margin-bottom_20">アカウント情報変更</h1>
      <table className="setting_table">
        <tr className="setting_table_tr">
          <td className="setting_table_td setting_table_title">
            <label htmlFor="settingEmail">現在のメールアドレス</label>
          </td>
          <td className="setting_table_td setting_table_content">
            <p>{nowEmailValue}</p>
          </td>
        </tr>
        {/* <div>
        <label htmlFor="settingEmail">新しいメールアドレス</label>
        <input
          type="email"
          value={newEmailValue}
          onChange={(e) => setNewEmailValue(e.target.value)}
          name="settingEmail"
          id="settingEmail"
        ></input>
      </div> */}
        <tr className="setting_table_tr">
          <td className="setting_table_td setting_table_title">
            <label htmlFor="settingPassword">現在のパスワード</label>
          </td>
          <td className="setting_table_td setting_table_content">
            <input
              type={isRevealNowPassword ? "text" : "password"}
              value={nowPassValue}
              onChange={(e) => setNowPassValue(e.target.value)}
              name="settingPassword"
              id="settingPassword"
            ></input>
            <div
              onClick={toggleNowPassword}
              role="presentation"
              className="isRevealPassword_icon"
            >
              {isRevealNowPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </td>
        </tr>

        <tr className="setting_table_tr">
          <td className="setting_table_td setting_table_title">
            <label htmlFor="settingPassword">新しいパスワード</label>
          </td>
          <td className="setting_table_td setting_table_content">
            <input
              type={isRevealNewPassword ? "text" : "password"}
              value={newPassValue}
              onChange={(e) => setNewPassValue(e.target.value)}
              name="settingPassword"
              id="settingPassword"
            ></input>
            <div
              onClick={toggleNewPassword}
              role="presentation"
              className="isRevealPassword_icon"
            >
              {isRevealNewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </td>
        </tr>

        <tr className="setting_table_tr">
          <td className="setting_table_td setting_table_title">
            <label htmlFor="settingCPassword">新しいパスワード（確認）</label>
          </td>
          <td className="setting_table_td setting_table_content">
            <input
              type={isRevealConfirmPassword ? "text" : "password"}
              value={cNewPassValue}
              onChange={(e) => setCNewPassValue(e.target.value)}
              name="settingCPassword"
              id="settingCPassword"
              placeholder="再度パスワードを入力"
            ></input>
            <div
              onClick={toggleConfirmPassword}
              role="presentation"
              className="isRevealPassword_icon"
            >
              {isRevealConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>

            {newPassValue.length > 0 && newPassValue !== cNewPassValue ? (
              <p>新しいパスワードと新しいパワード(確認)が一致していません</p>
            ) : (
              <></>
            )}
          </td>
        </tr>
      </table>

      <div className="confirm_btn">
        <button onClick={dataUpdate}>確定</button>
      </div>

      {/* <div className="account_delete">
        <button className="margin_left_auto" onClick={userDeleteAlert}>
          アカウントを削除
        </button>
      </div> */}

      <div className="back_btn">
        <div onClick={backBtn}>
          <IoIosArrowBack color="white" size={40} className="to_back" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PsswordChange;
