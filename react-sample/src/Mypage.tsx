import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, CollectionReference, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Icon from "./component/atoms/pictures/Icon";
import { auth, db } from "./firebase";
import { User } from "./types/types";

function MyPage() {
  //ログインしているとログイン情報を持つ
  const [user, setUser] = useState<any>("");

  //ログイン判定が終わるまでリダイレクトさせないようにする(ログイン判定するには時間がかかるから、ページ遷移を先にされてしまうと表示がおかしくなってしまう)
  const [loading, setLoading] = useState(true);

   //取得してきたデータを保持
   const [users, setUsers] = useState<any>([]);

   //follow配列
   const [followList,setFollowList] = useState<any>({follow:[]});

   //follower配列
   const [followerList,setFollowerList] = useState<any>({follower:[]});

  // ログインしているかどうか判定
  //ログインしていればuserにユーザー情報が代入される
  //currentUserプロパティを使用して、現在サインインしているユーザーを取得する(サインインしていなければnull)
  useEffect(() => {
    onAuthStateChanged(auth, async(currentUser: any) => {
      if(!currentUser){
        console.log("ログアウト状態です");
      } else {
      setUser(currentUser);
      //ログイン判定が終わったタイミングでloadingはfalseに変わる
      setLoading(false);

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
      const userDataId = userDocId.data();
      console.log(userDataId);
      setUsers(userDataId);

      if(!userDataId){
        console.log("データがありません");
      }else{
      setFollowList(userDataId.follow);
      setFollowerList(userDataId.follower);
      console.log(userDataId.name);
      console.log(userDataId.follow);
      }

      // console.log(users.name);  //undefinedになる

      console.log(followList);
      }
    });
  }, []);

  const navigate = useNavigate();

  //signOut関数はfirebaseに用意されている関数
  //ログアウトが成功するとログインページにリダイレクトする
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };

  // console.log(user.uid);
  // console.log(auth.currentUser)
  // console.log(users.follow.length);
  // const followNumber = ()=>{setFollowList(users.follow)};
  // console.log(followNumber);
  //  console.log(users.name);  //ここに書くとレンダリングされた時に実行されてundefinedになる

  return (
    <>
      {/* loadingがfalseのときのみマイページを表示する設定。loadingがfalseのときのみ */}
      {!loading && (
        <>
          {/* ログインしていない状態でマイページ表示しようとするとログインページにリダイレクトする設定(!userがログインしていない場合のこと) */}
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
            <div>
              <div>{users.userName}</div>
              {/* ユーザーのメールアドレスを表示(ログインしている場合は表示する){user && user.email}これの略↓ */}
              {/* <p>{user?.email}</p> */}
              <button>設定</button>
              <button onClick={logout}>ログアウト</button>
              </div>
              <div>
              <Icon />
              </div>
              <div>
                <div>投稿</div>
                <div>{followerList.length}フォロワー</div>
                <div>{followList.length}フォロー中</div>
              </div>
              <Link to={"/top/"}>Top</Link>
            </>
          )}
        </>
      )}
    </>
  );
}

export default MyPage;
