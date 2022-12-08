// type Props = {
//   imageUrl: string;
//   children?: ReactNode;
// };

interface Props {
  imageUrl: string;
}

//投稿１つ分の写真(myPageとprofileの投稿一覧と保存一覧)
// const OneThirdPost: FC<Props> = (props) => {
// const MyPost=(props:any) =>{
function OneThirdPost(props: Props) {
  return (
    <>
      <img className="post" src={props.imageUrl} alt="投稿" />
    </>
  );
}

export default OneThirdPost;
