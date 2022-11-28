import { Link } from "react-router-dom";
import MyPost from "../atoms/pictures/MyPost";

//そのユーザーのpost配列の情報が必要posts
function MyPostList(props: any) {
  return (
    <div>
      {props.posts.length > 0 ? (
        <div style={{display: "grid", gap:"0.5%", marginTop: "20px", flexWrap: "wrap", width:"100%", height: "auto", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"}}>
          {props.posts.map((post: any) => {
            return (
              <div style={{width: "300px", height: "300px", objectFit: "cover"}}>
                <Link
                  to="/PostDetails"
                  state={{
                    userid: props.users.userId,
                    postid: post.postId,
                  }}
                >
                  <MyPost imageUrl={post.imageUrl} />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {props.message}
        </div>
      )}
    </div>
  ); //return
}

export default MyPostList;
