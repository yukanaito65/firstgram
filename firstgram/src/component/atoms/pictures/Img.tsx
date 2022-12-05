import React from "react";

interface Props {
  imgUrl: string;
}

function Img(props: Props) {
  return (
    <div
    // style={{ width: "100%", marginTop: "10px", aspectRatio: "4/3" }}
    className="postImage">
      <img
        alt="投稿"
        src={props.imgUrl}
        // style={{ margin: "auto", display: "block" }}
        // style={{width:"100%",height: "100%", objectFit: "cover"}}
        className="postImage__img"
      />
    </div>
  );
}

export default Img;
