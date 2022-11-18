import React from "react";
import { Link } from "react-router-dom";

function Follower() {
  return (
    <>
      <Link to={"/profile"}>⬅︎</Link>
      <div>Follower</div>
    </>
  );
}

export default Follower;
