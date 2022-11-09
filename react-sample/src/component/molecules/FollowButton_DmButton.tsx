import React from "react";
import DmButton from "../atoms/button/DmButton";
import FollowButton from "../atoms/button/FollowButton";
import UnfollowButton from "../atoms/button/UnfollowButton";

function FollowButton_DmButton() {
  return (
    <>
      <div>
        {"フォローしてない状態" ? (
          <FollowButton onClick={() => console.log("フォローする")} />
        ) : (
          <UnfollowButton onClick={() => console.log("フォロー解除")} />
        )}

        <UnfollowButton onClick={() => console.log("フォロー解除")} />
        <DmButton onClick={() => console.log("DMボタン")} />
      </div>
    </>
  );
}

export default FollowButton_DmButton;
