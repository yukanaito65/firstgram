import { FC, ReactNode } from "react";

type Props = {
  imageUrl: string;
  children?: ReactNode;
};

const MyPost: FC<Props> = (props) => {
  // const MyPost=(props:any) =>{
  return (
    <div>
      <img src={props.imageUrl} alt="投稿" />
    </div>
  );
};

export default MyPost;
