import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import firebasePostDetails from "../utils/firebasePostDetails";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "../molecules/Footer";
import Header from "../molecules/Header";
import GetLoginUserData from "../utils/GetLoginUserData";
import FavoriteUpdata from "../utils/FavoriteUpdata";
import {
  AiFillHeart,
  AiOutlineClose,
  AiOutlineEllipsis,
  AiOutlineHeart,
  AiOutlineMessage,
} from "react-icons/ai";
import PostIcon from "../atoms/icon/PostIcon";
import Post from "../atoms/icon/Post";
import CommentsDisplay from "../molecules/CommentsDisplay";
import KeepButton from "../atoms/button/KeepButton";
import FavoLength from "../molecules/FavoLength";
import Caption from "../molecules/Caption";

interface State {
  postid: string;
  userid: string;
}

function PostDetails() {
  const [user, setUser] = useState<any>("");
  // ログインユーザー
  const [loginUserPost, setLoginUserPost] = useState(false);
  // ログインしているユーザーのuserNameを格納
  const [loginUserName, setLoginUserName] = useState<any>("");
  // ログインしているユーザーのkeepPostsを格納(保存ボタン用)
  const [loginUserKeep, setLoginUserKeep] = useState("");

  // 画像urlを格納
  const [imgUrl, setImgUrl] = useState<any>("");
  // captionを格納
  const [caption, setCaption] = useState<any>("");
  // favolitesを格納
  const [favorites, setFavorites] = useState<any>([]);

  // commentを格納
  const [displayComment, setDisplayComment] = useState<any>([]);
  // inputcommentを格納
  const [inputComment, setInputComment] = useState<any>("");
  // postUserNameを格納
  const [postUserName, setPostUserName] = useState<any>("");
  // iconを格納
  const [icon, setIcon] = useState<any>("");

  // selectbutton表示非表示
  const [select, setSelect] = useState<boolean>(false);

  // コメントの表示非表示
  const [commentDisplay, setCommentDisplay] = useState<boolean>(false);

  // postlookからデータを持ってくる
  const location = useLocation();
  const { postid, userid } = location.state as State;

  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      setUser(user);

      GetLoginUserData(user).then((loginUserData: any) => {
        setLoginUserName(loginUserData.userName);
        setLoginUserKeep(loginUserData.keepPosts);
      });

      if (user?.uid === userid) {
        // useStateでログインしているユーザーの投稿かどうか判定するを保持
        setLoginUserPost(true);
      } else {
        setLoginUserPost(false);
      }
    });

    // 画面遷移したら、firestoreから画像、caption,falolites,commmentを取得、保持
    firebasePostDetails(postid, userid).then((postData) => {
      setImgUrl(postData.Imgurl);
      setCaption(postData.Caption);
      setFavorites(postData.Favorites);
      setDisplayComment(postData.Comments);
      // setTime(postData.Time)
      setPostUserName(postData.PostUserName);
      setIcon(postData.Icon);
    });
  }, []);

  // お気に入りボタンがクリックされたら
  const Favorite = async (e: any) => {
    // 押された投稿のFavolitesにloginUserNameを配列で追加
    FavoriteUpdata(postid, loginUserName, arrayUnion);
    // firestoreからfavolitesを取得、保持
    await firebasePostDetails(postid, userid).then((postData) => {
      setFavorites(postData.Favorites);
    });
  };

  // お気に入り取り消し機能
  const NoFavorite = async (e: any) => {
    // 押された投稿のFavolitesからloginUserNameを削除
    FavoriteUpdata(postid, loginUserName, arrayRemove);
    // firestoreからfavolitesを取得、保持
    await firebasePostDetails(postid, userid).then((postData) => {
      setFavorites(postData.Favorites);
    });
  };

  // コメント送信ボタンがクリックされたら
  const AddComment = async (e: any) => {
    // 押された投稿のcommentにinputCommentを配列で追加
    const postDataDocRefId = doc(collection(db, "post"), postid);
    updateDoc(postDataDocRefId, {
      comments: arrayUnion({
        userName: loginUserName,
        commentText: inputComment,
      }),
    });
    // firestoreからcommentを取得、保持
    await firebasePostDetails(postid, userid).then((postData) => {
      setDisplayComment(postData.Comments);
    });
    setInputComment("");
  };

  const ClickDelition = async (e: any) => {
    // userのpostId削除
    // 投稿者のuser情報取得
    const postUserDocRef = doc(collection(db, "user"), userid);
    // 上記を元にドキュメントのデータを取得
    const postUserDoc = await getDoc(postUserDocRef);
    // 取得したデータから必要なものを取り出す
    const postUserData = postUserDoc.data();
    // 投稿者のpostを取り出す
    const postUserPost = postUserData?.posts;
    const index = postUserPost.indexOf(postid);
    postUserPost.splice(index, 1);
    // console.log(postUserPost)
    await updateDoc(postUserDocRef, {
      posts: postUserPost,
    });

    // UserのkeepPosts削除
    const DeleteKeepPosts = query(
      collection(db, "user"),
      where("keepPosts", "array-contains", postid)
    );
    const DeleteKeepPostsUsers: any[] = [];
    const DeleteKeepPostsUser = await getDocs(DeleteKeepPosts);
    DeleteKeepPostsUser.forEach((doc) => {
      const users = (doc.id, " => ", doc.data());
      DeleteKeepPostsUsers.push(users);
    });
    console.log(DeleteKeepPostsUsers);
    DeleteKeepPostsUsers.forEach(async (userData) => {
      const keepUserId = userData?.userId;
      const UserKeepPosts = userData?.keepPosts;
      const index = UserKeepPosts.indexOf(postid);
      UserKeepPosts.splice(index, 1);
      console.log(UserKeepPosts);
      await updateDoc(doc(collection(db, "user"), keepUserId), {
        keepPosts: UserKeepPosts,
      });
    });

    // postを削除
    await deleteDoc(doc(db, "post", postid));
  };

  const Select = (e: any) => {
    setSelect(true);
  };

  const Back = (e: any) => {
    setSelect(false);
  };

  const CommentDisplay = (e: any) => {
    setCommentDisplay(true);
  };

  const CommentBack = (e: any) => {
    setCommentDisplay(false);
  };

  return (
    <>
      <Header show={true} />
      <div>
        {loginUserPost ? (
          <>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <div className="postDetails_postIcon">
                <Link
                  to={userid === user.uid ? "/mypage" : "/profile"}
                  state={{ userId: userid }}
                >
                  <PostIcon icon={icon} />
                </Link>
              </div>
              <p style={{ fontSize: "20px", marginLeft: "5px" }}>
                {postUserName}
              </p>

              {select ? (
                <>
                  <div style={{ marginLeft: "auto" }}>
                    <nav style={{ width: "100%", margin: "0 auto " }}>
                      <ul
                        style={{
                          padding: "5px 0",
                          position: "fixed",
                          top: "100px",
                          right: "25%",
                          listStyle: "none",
                          width: "20%",
                          backgroundColor: " #f7f7f7",
                          boxShadow: "0 0px 10px 7px rgb(0 0 0 / 10%)",
                          fontSize: "19px",
                          zIndex: " 800",
                          marginLeft: "auto",
                        }}
                      >
                        <li
                          style={{
                            width: "100%",
                            borderBottom: "2px solid #e7e7e7",
                            padding: "5px 0",
                          }}
                        >
                          <Link
                            to="/PostEditing"
                            state={{ postid: postid, userid: userid }}
                          >
                            <button className="nav_menu_btn">編集</button>
                          </Link>
                        </li>
                        <li
                          style={{
                            width: "100%",
                            borderBottom: "2px solid #e7e7e7",
                            padding: "5px 0",
                          }}
                        >
                          <Link to="/">
                            <button
                              onClick={ClickDelition}
                              className="nav_menu_btn"
                            >
                              削除
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  <div style={{ marginLeft: "auto" }}>
                    <AiOutlineClose
                      style={{ display: "block" }}
                      size={27}
                      color={"rgb(38, 38, 38)"}
                      onClick={Back}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginLeft: "auto" }}>
                    <AiOutlineEllipsis
                      style={{ display: "block" }}
                      size={40}
                      color={"rgb(38, 38, 38)"}
                      onClick={Select}
                    />
                  </div>
                </>
              )}
            </div>
            <Post imgUrl={imgUrl} />
            <div style={{ display: "flex" }}>
              <div style={{ margin: "10px 5px 0px 5px" }}>
                {favorites.includes(loginUserName) ? (
                  <AiFillHeart size={30} color={"red"} onClick={NoFavorite} />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    color={"rgb(38, 38, 38)"}
                    onClick={Favorite}
                  />
                )}
              </div>

              <div style={{ margin: "10px 5px 0px 5px" }}>
                <AiOutlineMessage
                  size={30}
                  color={"rgb(38, 38, 38)"}
                  onClick={CommentDisplay}
                />
              </div>

              <div style={{ margin: "5px 5px 5px auto" }}>
                <KeepButton loginUserKeep={loginUserKeep} data={postid} />
              </div>
            </div>

            <FavoLength favos={favorites} />
            <Caption data={caption} />

            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  width: "70%",
                  height: "30px",
                  margin: "5px",
                }}
              >
                <input
                  style={{ width: "100%" }}
                  type="text"
                  value={inputComment}
                  onChange={(e) => {
                    setInputComment(e.target.value);
                  }}
                ></input>
              </div>
              <div style={{ marginLeft: "auto", width: "30%" }}>
                <button onClick={AddComment}>投稿する</button>
              </div>
            </div>
            {commentDisplay ? (
              <>
                <div style={{ display: "flex" }}>
                  <CommentsDisplay displayComment={displayComment} />
                  <AiOutlineClose
                    style={{
                      display: "block",
                      margin: "auto 0 0 auto",
                      alignItems: "center",
                    }}
                    size={15}
                    color={"rgb(38, 38, 38)"}
                    onClick={CommentBack}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <div className="postDetails_postIcon">
                <Link
                  to={userid === user.uid ? "/mypage" : "/profile"}
                  state={{ userId: userid }}
                >
                  <PostIcon icon={icon} />
                </Link>
              </div>
              <p style={{ fontSize: "20px", marginLeft: "5px" }}>
                {postUserName}
              </p>
              <div style={{ marginLeft: "auto" }}>
                <Link to="/">
                  <AiOutlineEllipsis
                    style={{ display: "block" }}
                    size={40}
                    color={"rgb(38, 38, 38)"}
                    onClick={Select}
                  />
                </Link>
              </div>
            </div>

            <Post imgUrl={imgUrl} />

            <div style={{ display: "flex" }}>
              <div style={{ margin: "10px 5px 0px 5px" }}>
                {favorites.includes(loginUserName) ? (
                  <AiFillHeart size={30} color={"red"} onClick={NoFavorite} />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    color={"rgb(38, 38, 38)"}
                    onClick={Favorite}
                  />
                )}
              </div>

              <div style={{ margin: "10px 5px 0px 5px" }}>
                <Link to="/">
                  <AiOutlineMessage
                    size={30}
                    color={"rgb(38, 38, 38)"}
                    onClick={CommentDisplay}
                  />
                </Link>
              </div>

              <div style={{ margin: "5px 5px 5px auto" }}>
                <KeepButton loginUserKeep={loginUserKeep} data={postid} />
              </div>
            </div>

            <FavoLength favos={favorites} />

            <Caption data={caption} />

            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  width: "70%",
                  height: "30px",
                  margin: "5px",
                }}
              >
                <input
                  style={{ width: "100%" }}
                  type="text"
                  value={inputComment}
                  onChange={(e) => {
                    setInputComment(e.target.value);
                  }}
                ></input>
              </div>

              <div style={{ marginLeft: "auto", width: "30%" }}>
                <button onClick={AddComment}>投稿する</button>
              </div>
            </div>

            {commentDisplay ? (
              <>
                <div style={{ display: "flex" }}>
                  <CommentsDisplay displayComment={displayComment} />
                  <AiOutlineClose
                    style={{
                      display: "block",
                      margin: "auto 0 0 auto",
                      alignItems: "center",
                    }}
                    size={15}
                    color={"rgb(38, 38, 38)"}
                    onClick={CommentBack}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default PostDetails;
