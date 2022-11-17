import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import NewPost from './NewPost';

function Top() {
  //ログインしているとログイン情報を持つ
  const [user, setUser] = useState<any>("");

  //ログイン判定が終わるまでリダイレクトさせないようにする(ログイン判定するには時間がかかるから、ページ遷移を先にされてしまうと表示がおかしくなってしまう)
  const [loading, setLoading] = useState(true);

  // ログインしているかどうか判定
  //ログインしていればuserにユーザー情報が代入される
  //currentUserプロパティを使用して、現在サインインしているユーザーを取得する(サインインしていなければnull)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      //ログイン判定が終わったタイミングでloadingはfalseに変わる
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  //signOut関数はfirebaseに用意されている関数
  //ログアウトが成功するとログインページにリダイレクトする
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };
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
              <h1>Topページ</h1>
              {/* ユーザーのメールアドレスを表示(ログインしている場合は表示する){user && user.email}これの略↓ */}
              <p>{user?.email}</p>
              <NewPost uid={user.uid}/>
              <button onClick={logout}>ログアウト</button>
              <Link to={"/mypage/"}>マイページ</Link>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Top