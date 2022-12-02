import { QuerySnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import Post from "../atoms/pictures/Post";

//posts,users
//投稿詳細を開くためにuserIdが必要＝その投稿のユーザーのuserIdがあればいい。マイページだとそのプロフィール画面のユーザーのid→postsだけでいい

// interface Props {
//   posts : QuerySnapshot[];
// //  message: string | Element;
// }
//そのユーザーのpost配列の情報が必要posts
function ThreeRowsPostList(props: any) {
  return (
    <div>
      {props.posts.length > 0 ? (
        <div className="threeRowsPostList">
          {props.posts.map((post: any) => {
            return (
              // <div style={{width: "300px", height: "300px", objectFit: "cover"}}>
              <div className="threeRowsPostList_image-div">
                {/* <div className="myPostList_image-height"> */}
                <Link
                  to="/PostDetails"
                  state={{
                    // userid: props.users.userId,
                    userid: post.userId,
                    postid: post.postId,
                  }}
                >
                  <Post imageUrl={post.imageUrl} />
                </Link>
                {/* </div> */}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="threeRowsPostList_message">{props.message}</div>
      )}
    </div>
  ); //return
}

export default ThreeRowsPostList;
