import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../../firebase";
import { useLocation } from "react-router-dom";

interface State {
  userId: string;
} 

  const SendDM = () => {
    const [message, setMessage] = useState("");
    const curretUser = auth.currentUser;
    const currentUserId = curretUser?.uid;

    const location = useLocation();
    const { userId } = location.state as State;

    async function sendMessage(e: any) {
      // 再ロードされないようにする
      e.preventDefault();

      // dbを使って情報を追加する
      const collectionMesse: any = collection(db, "messages");
      await addDoc(collectionMesse, {
        message: message,
        timestamp: serverTimestamp(),
        userId: currentUserId,
        withUserId: userId,
      });
      setMessage("");
      window.location.reload()
    }
    return (
      <div>
        {/* form入力をし、enterキーを押したときにonSubmitの中の関数が実行される */}
        <form onSubmit={sendMessage} className="dmpage_form">
          <div className="dmpage_form_wrapper">
            <input
            className="dmpage_form_input"
              placeholder="メッセージを入力..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button className="dmpage_form_btn">送信</button>
          </div>
        </form>
      </div>
    );
  };


export default SendDM;
