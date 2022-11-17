import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../../firebase";

  const SendDM = () => {
    const [message, setMessage] = useState("");
    const curretUser = auth.currentUser
    const currentUserId = curretUser?.uid

    async function sendMessage(e: any) {
      // 再ロードされないようにする
      e.preventDefault();

      // const { uid, photoURL } = auth.currentUser;

      // dbを使って情報を追加する
      const collectionMesse: any = collection(db, "messages");
      await addDoc(collectionMesse, {
        message: message,
        timestamp: serverTimestamp(),
        userId: currentUserId,
        withUserId: "",
      });
      setMessage("");
    }
    return (
      <div>
        {/* form入力をし、enterキーを押したときにonSubmitの中の関数が実行される */}
        <form onSubmit={sendMessage}>
          <div>
            <input
              placeholder="メッセージを入力"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button>送信</button>
          </div>
        </form>
        <div>{message}</div>
      </div>
    );
  };


export default SendDM;
