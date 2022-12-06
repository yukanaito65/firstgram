import React from "react";

interface Props {
  imgUrl: string;
}

function Img(props: Props) {
  return (
    <div className="img">
    <div className="img__style"
    // style={{ width: "100%", marginTop: "10px", aspectRatio: "4/3" }}
    >
      <img className="img__img"
        alt=""
        src={props.imgUrl}
        // style={{ margin: "auto", display: "block" }}
        // style={{width:"100%",height: "100%", objectFit: "cover"}}
      />
    </div>
    </div>
  );
}

export default Img;
