import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Icon from "./component/atoms/pictures/Icon";
import { auth, db } from "./firebase";
import { User } from "./types/types";
import { Post } from "./types/types";

function MyPage() {
  //ログインしているとログイン情報を持つ
  const [user, setUser] = useState<any>("");

  //ログイン判定が終わるまでリダイレクトさせないようにする(ログイン判定するには時間がかかるから、ページ遷移を先にされてしまうと表示がおかしくなってしまう)
  const [loading, setLoading] = useState(true);

  //取得してきたデータを保持
  const [users, setUsers] = useState<any>([]);
  const [posts, setPosts] = useState<QuerySnapshot[]>([]);
  // const [posts, setPosts] = useState<any[]>([]);


  //userのpost配列
  const [postList, setPostList] = useState<any>({ post: [] });

  //userのfollow配列
  const [followList, setFollowList] = useState<any>({ follow: [] });

  //userのfollower配列
  const [followerList, setFollowerList] = useState<any>({ follower: [] });

  // ログインしているかどうか判定
  //ログインしていればuserにユーザー情報が代入される
  //currentUserプロパティを使用して、現在サインインしているユーザーを取得する(サインインしていなければnull)
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
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
        console.log(userDocId);

        // //取得したデータから必要なものを取り出す
        const userDataId:any = userDocId.data();
        console.log(userDataId);
        setUsers(userDataId);

        if (!userDataId) {
          console.log("データがありません");
        } else {
          setPostList(userDataId.post);
          setFollowList(userDataId.follow);
          setFollowerList(userDataId.follower);
          console.log(userDataId.name);
          console.log(userDataId.follow);
          console.log(userDataId.post);
        }

         //postコレクションへの参照を取得(userIdが一致しているドキュメントのみ)
         const postCollectionRef:any = query(collection(
          db,
          "post"
        ), where("userId", "==", currentUser.uid))as CollectionReference<Post>;

        // 上記を元にドキュメントのデータを取得(post)
        const postDocId:any = await getDocs(postCollectionRef);
        console.log(postDocId.docs); // 配列

        //上記を元にデータの中身を取り出す。map()を使えるようにする。
        const newPostDocIds = postDocId.docs as any[];
        const postDataArray = newPostDocIds.map((id)=>id.data());
        setPosts(postDataArray);
        // console.log(posts);
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

  // console.log(users.post);
  // console.log(user.uid);
  // console.log(auth.currentUser)
  // console.log(users.follow.length);
  // const followNumber = ()=>{setFollowList(users.follow)};
  // console.log(followNumber);
  // console.log(users.name);  //ここに書くとレンダリングされた時に実行されてundefinedになる
// console.log(posts);

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
                <div>{postList.length}投稿</div>
                <div>{followerList.length}フォロワー</div>
                <div>{followList.length}フォロー中</div>
              </div>
              <div>{users.profile}</div>

              <div>
                 {posts.map((post:any)=>{
                  return(
                     <img src={post.imageUrl} alt="投稿" />
                  )
                 })}
               </div>
              <Link to={"/"}>Top</Link>
            </>
          )}
        </>
      )}
    </>
  );
}

export default MyPage;
