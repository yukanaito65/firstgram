import { Link } from "react-router-dom";
import MyPost from "../atoms/pictures/MyPost";

//そのユーザーのpost配列の情報が必要posts
function MyPostList(props: any) {
  return (
    <div>
      {props.posts.length > 0 ? (
        <div>
          {props.posts.map((post: any) => {
            return (
              <>
                <Link
                  to="/PostDetails"
                  state={{
                    userid: props.users.userId,
                    postid: post.postId,
                  }}
                >
                  <MyPost imageUrl={post.imageUrl} />
                </Link>
              </>
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
  ); //return
}

export default MyPostList;
