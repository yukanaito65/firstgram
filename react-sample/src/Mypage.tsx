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
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Icon from "./component/atoms/pictures/Icon";
import MyPost from "./component/atoms/pictures/MyPost";
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
        const userDataId: any = userDocId.data();
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
        const postCollectionRef: any = query(
          collection(db, "post"),
          where("userId", "==", currentUser.uid)
        ) as CollectionReference<Post>;

        console.log(postCollectionRef); //Zcがひとつ

        // 上記を元にドキュメントのデータを取得(post)
        const postDocId: any = await getDocs(postCollectionRef);
        console.log(postDocId.docs); // 配列(3)[rl,rl,rl]
        console.log(postDocId); //ol

        //上記を元にデータの中身を取り出す。map()を使えるようにする。
        const newPostDocIds = postDocId.docs as any[];
        const postDataArray = newPostDocIds.map((id) => id.data());
        console.log(postDataArray); //(3)[{},{},{}]
        setPosts(postDataArray);
        console.log(posts); //[]
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
  console.log(posts); //postコレクションからuidと等しいドキュメントを取得したものが格納されている
  console.log(postList); //userコレクションからログインユーザーの情報を取得して、post配列の中身だけ格納している

  return (
    <>
      {/* loadingがfalseのときのみマイページを表示する設定。loadingがfalseのときのみ */}
      {!loading && (
        <>
          {/* ログインしていない状態でマイページ表示しようとするとログインページにリダイレクトする設定(!userがログインしていない場合のこと) */}
          {!user ? (
            <Navigate to={`/login`} />
          ) : (
            <>
              <div>
                <div>{users.userName}</div>
                <Link to={"/AccountSettingPage"}>
                  <button>設定</button>
                </Link>
                <button onClick={logout}>ログアウト</button>
                <Link to="/NewPost/">
                  <button>新規投稿</button>
                </Link>
                <Link to={"/"}>Top</Link>
              </div>
              <div>
                <Icon />
              </div>
              <div>
                <div>{posts.length}投稿</div>
                <Link to={"/myFollower"}>
                  <div>{followerList.length}フォロワー</div>
                </Link>
                <Link to={"/myFollow"}>
                  <div>{followList.length}フォロー中</div>
                </Link>
              </div>
              <div>{users.profile}</div>
              <div>
                {posts.length > 0 ? (
                  <div>
                    {posts.map((post: any) => {
                      return (
                        <Link
                          to="/PostDetails"
                          state={{ userId: users.userId, postId: post.postId }}
                        >
                          <MyPost imageUrl={post.imageUrl} />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <p>初めて投稿してみよう！</p>
                    <Link to="/NewPost/">新規投稿はこちら</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
      <Link to={`/dmPage`}>
        <button>DM</button>
      </Link>
      <Link to={"/PostLook"}>
        <button>一覧表示</button>
      </Link>
    </>
  );
}

export default MyPage;
