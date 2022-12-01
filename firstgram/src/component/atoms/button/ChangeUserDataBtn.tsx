import {
  doc,
  collection,
  updateDoc,
  CollectionReference,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import type { User } from "../../../types/types";
import { db } from "../../../firebase";
import { Auth } from "@firebase/auth";

interface Props {
  icon: string | undefined;
  userName: string | undefined;
  name: string | undefined;
  profile: string | undefined;
}

function ChangeUserDataBtn({ icon, userName, name, profile }: Props) {
  // getAuthを使えるように定義
  const auth: Auth = getAuth();
  const currentUser = auth.currentUser;
  const currentUserId: string | undefined = currentUser?.uid;

  // useNavigateを使えるように定義
  const navigate = useNavigate();

  const userCollectionRef = collection(db, "user") as CollectionReference<User>;
  const docDtata = doc(userCollectionRef, currentUserId);

  updateDoc(docDtata, {
    icon: icon,
    userName: userName,
    name: name,
    profile: profile,
  });
  navigate("/mypage");
}

export default ChangeUserDataBtn;
