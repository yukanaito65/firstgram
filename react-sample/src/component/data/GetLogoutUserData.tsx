import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useState } from "react";


// ドキュメント名を引数に取る
interface Props {
  docName: string;
  fieldName: string;
}

// 引数に表示したいドキュメント(userId)とフィールドを挿入
export function GetLogoutUserData({ docName, fieldName }: Props) {
  const [userData, setUserData] = useState("");

  async function getData() {
    const docRef = doc(db, "user", `${docName}`);
    const docSnap = await getDoc(docRef);
    console.log(docRef);
    const field = docSnap.get(`${fieldName}`);

    if (docSnap.exists()) {
      console.log("Document data:", field);
      setUserData(field);
    } else {
      // doc.data() will be undefined in this case
      console.log("データがありません");
    }
  }
  getData();

  return (
    <>
      <p>{userData}</p>
    </>
  );
}
