import { FC, ReactNode } from "react";

// type Props = {
//   imageUrl: string;
//   children?: ReactNode;
// };

interface Props {
  imageUrl:string;
}

//imageUrlをpropsで受け取る
//投稿１つ分の写真(myPageとprofileの投稿一覧と検索一覧)
// const OneThirdPost: FC<Props> = (props) => {
  // const MyPost=(props:any) =>{
    function OneThirdPost(props:Props) {
  return (
    // <div style={{width: "350px", height: "350px"}}>
    <>
      <img
      className="post"
      src={props.imageUrl}
      alt="投稿"
      // style={{width: "300px", height: "300px", objectFit: "cover"}}
      // style={{width: "100%",height: "100%", objectFit: "cover"}}
       />
    </>
  );
};

export default OneThirdPost;
