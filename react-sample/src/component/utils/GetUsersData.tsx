import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";

// ドキュメント名を引数に取る
// interface Props {
//     docName: string
//   }

// export async function GetUsersData({ docName }:Props) {
//   const usersRef = doc(db, "users", `${docName}`);
//   const docSnap = await getDoc(usersRef);

//   return (
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
//   )
// }

export async function GetUsersData() {

    const [userData, setUserData] = useState<any>("")

      const userDocumentRef = doc(db, "user", "8Ui1g5IHmhXMALQDWmEj5JXkirr1");
      getDoc(userDocumentRef).then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          console.log("Document data:", documentSnapshot.get("email"));
          setUserData(documentSnapshot.get("email"))
        } else {
          console.log("No such document!");
        }
      });

      return (
        <p>{userData}</p>
      )

    }
