import { onAuthStateChanged } from "firebase/auth";
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
import { Link, useLocation } from "react-router-dom";
import AddFollowButton from "./component/atoms/button/AddFollowButton";
// import FollowButton from "./component/atoms/button/FollowButton";
import RemoveFollowButton from "./component/atoms/button/RemoveFollowButton";
import FollowerCount from "./component/atoms/user/FollowerCount";
import CommonIcon from "./component/atoms/pictures/CommonIcon";
import UserName from "./component/atoms/user/UserName";
import MyPostList from "./component/molecules/MyPostList";
import { auth, db } from "./firebase";
import { Post } from "./types/types";
import PostCount from "./component/atoms/user/PostCount";
import FollowCount from "./component/atoms/user/FollowCount";
import Header from "./component/molecules/Header";
import Footer from "./component/molecules/Footer";
import Name from "./component/atoms/user/Name";

interface State {
  userId: string;
}

function Profile() {
  const [user, setUser] = useState<any>("");

  //ログインユーザーのfollow情報
  const [usersFollow, setUsersFollow] = useState<any>([]);

  //userIdのユーザーの情報
  const [profileUsers, setProfileUsers] = useState<any>([]);
  const [posts, setPosts] = useState<QuerySnapshot[]>([]);

  const [loading, setLoading] = useState(true);

  //userのpost配列
  // const [postList, setPostList] = useState<any>({ post: [] });

  //userのfollow配列
  const [followList, setFollowList] = useState<any>({ follow: [] });

  //userのfollower配列
  const [followerList, setFollowerList] = useState<any>({ follower: [] });

  // const [followBtn,setFollowBtn] = useState<boolean>();

  // const [followerNum,setFollowerNum] = useState(0);

  //各ページからデータ取得
  const location = useLocation();
  const { userId } = location.state as State;
  console.log(userId);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      setLoading(false);
      setUser(currentUser);

      const userCollectionRef = collection(db, "user");

      //ログインユーザーのfollow配列取得
      const userDocRefId = doc(userCollectionRef, currentUser.uid);

      const userDocId = await getDoc(userDocRefId);

      const userDataFollow = userDocId.get("follow");
      setUsersFollow(userDataFollow);

      //前のページから渡されたuserIdを元にデータ取得し、usersに格納
      const profileUserDocRefId = doc(userCollectionRef, userId);

      const profileUserDocId = await getDoc(profileUserDocRefId);

      const profileUserDataId = profileUserDocId.data();
      setProfileUsers(profileUserDataId);
      console.log(profileUserDataId);

      if (!profileUserDataId) {
        console.log("データがありません");
      } else {
        // setPostList(profileUserDataId.post);
        setFollowList(profileUserDataId.follow);
        setFollowerList(profileUserDataId.follower);
        // setFollowerNum(profileUserDataId.follower.length);
      }

      //投稿一覧取得
      const postCollectionRef: any = query(
        collection(db, "post"),
        where("userId", "==", userId)
      ) as CollectionReference<Post>;

      // 上記を元にドキュメントのデータを取得(post)
      const postDocId: any = await getDocs(postCollectionRef);

      //上記を元にデータの中身を取り出す。map()を使えるようにする。
      const newPostDocIds = postDocId.docs as any[];
      const postDataArray = newPostDocIds.map((id) => id.data());
      setPosts(postDataArray);
    });
  }, []);

  console.log(profileUsers); //[]
  console.log(profileUsers.follow); //undefined
  console.log(posts); //[]
  console.log(followList); //follow[]
  console.log(userId); //id出てる
  console.log(profileUsers.userId); //undefined
  console.log(usersFollow);

  // const dispatch = useDispatch();

  // const followerNum = useSelector((state:any)=>state.followerCountSlice.follower);

  return (
    <>
      {!loading && (
        <>
          <Header show={true} />
          <div>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              <UserName users={profileUsers} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10%",
                margin: "10px 20px",
                alignItems: "center",
              }}
            >
              <CommonIcon icon={profileUsers.icon} />

              <div
                style={{
                  display: "flex",
                  width: "330px",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <PostCount posts={posts} />
                {/* <Link to={"/follower"} state={{ userId: userId, follower:followerList, uid: user.uid }}>
            <div>{followerNum}follower</div>
          </Link> */}

                {/* <FollowerCount
           followerList={followerList}
           link={"/follower"}
           uid={user.uid}
           userId={userId}
           /> */}

                <FollowCount
                  followList={followList}
                  link={"/follow"}
                  userId={userId}
                  uid={user.uid}
                />
              </div>

              {/* redux↓ */}
              {/* <p>{followerNum.length}aaa</p> */}
            </div>

            <span style={{ fontWeight: "bold" }}>
              <Name users={profileUsers} />
            </span>
            <div>{profileUsers.profile}</div>

          <div style={{display: "flex", gap: "5%"}}>
            {usersFollow.includes(userId) ? (
              <>
                <RemoveFollowButton
                  userId={userId}
                  // onClick={()=>setFollowerNum(followerNum)}
                  // followerNum={followerNum}
                />
              </>
            ) : (
              <>
                <AddFollowButton userId={userId} />
              </>
            )}

            <Link to={`/dmPage`} state={{ userId: userId }}>
              <button>DM</button>
            </Link>

            </div>

            <MyPostList posts={posts} users={profileUsers} message={<p>投稿がありません</p>} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Profile;
