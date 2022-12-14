import React from "react";

interface Props {
  imgUrl: string;
}

function Img(props: Props) {
  return (
    <div className="postImage">
      <img
        alt="投稿"
        src={props.imgUrl}
        className="postImage__img"
      />
    </div>
  );
}

export default Img;
