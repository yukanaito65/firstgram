import { QuerySnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Post } from "../../types/types";
import OneThirdPost from "../atoms/pictures/OneThirdPost";

//posts,users
//投稿詳細を開くためにuserIdが必要＝その投稿のユーザーのuserIdがあればいい。マイページだとそのプロフィール画面のユーザーのid→postsだけでいい

interface Props {
  posts : Post[];
 message: JSX.Element;
}
//そのユーザーのpost配列の情報が必要posts
function ThreeRowsPostList(props: Props) {
  props.posts.sort((a:Post, b:Post) => {
    return a.postDate > b.postDate ? -1 : 1;
  });

  return (
    <div>
      {props.posts.length > 0 ? (
        <div className="threeRowsPostList">
          {props.posts.map((post: Post) => {
            return (
              <div className="threeRowsPostList__image">
                <Link
                  to="/PostDetails"
                  state={{
                    userid: post.userId,
                    postid: post.postId,
                  }}
                >
                  <OneThirdPost imageUrl={post.imageUrl} />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="threeRowsPostList__message">{props.message}</div>
      )}
    </div>
  ); //return
}

export default ThreeRowsPostList;
