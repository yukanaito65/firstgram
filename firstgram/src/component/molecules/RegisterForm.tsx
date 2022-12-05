import { spawn } from "child_process";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { auth, db, storage } from "../../firebase";
import RegisterButton from "../atoms/button/RegisterButton";
import RegisterIcon from "../atoms/icon/RegisterIcon";
import InputCPass from "../atoms/Input/InputCPass";
import InputEmail from "../atoms/Input/InputEmail";
import InputPass from "../atoms/Input/InputPass";
import InputRegister from "../atoms/Input/InputRegister";
import InputRegisterPass from "../atoms/Input/InputRegisterPass";
import InputRequiredRegister from "../atoms/Input/InputRequiredRegister";
import InputUserRegister from "../atoms/Input/InputRequiredRegister";

function RegisterForm() {
  //Authenticationに登録するemailとpassword
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  //loadingしているかしてないか監視する
  const [loading, setLoading] = useState(false);

  // 画像のアップロードが完了したか確認する
  const [isUploaded, setIsUploaded] = useState(false);

  //画像のURL
  const [imgSrc, setImgSrc] = useState("");

  //画像アップロード＆URL取得
  const InputImage = (e:any) => {
    const file = e.target.files[0];

    // パスと名前で参照を作成
    const storageRef = ref(storage, "image/" + file.name);

    // 画像のアップロード
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      "state_changed",
      // upload開始したらloading中になる(loadingがtrueになる)
      (snapshot) => {
        setLoading(true);
      },
      (err) => {
        console.log(err);
      },
      //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
      () => {
        setLoading(false);
        setIsUploaded(true);

        getDownloadURL(storageRef).then((url) => {
          setImgSrc(url);
        });
      }
    );
  };

  //Authenticationへのユーザー登録、FireStoreへのデータ新規追加
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      //Authenticationへのユーザー登録
      //登録するのと同時にログインされる
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      //FireStoreへのデータ新規追加
      const { userName, name, Cpassword, profile } = e.target.elements;
      console.log(userName.value);

      //ログイン判定
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          console.log("ログアウト状態です");
        } else {
          //ログイン済みユーザーのドキュメントへの参照を取得
          const docRef = doc(db, "user", user.uid);

          //上記を元にドキュメントのデータを取得
          const userDoc = await getDoc(docRef);

          //exists()でドキュメントの存在の有無を確認
          if (!userDoc.exists()) {
            //FireStoreにユーザー用のドキュメントが作られていなければ新規作成
            setDoc(docRef, {
              userId: user.uid,
              email: registerEmail,
              userName: userName.value,
              name: name.value,
              password: registerPassword,
              Cpassword: Cpassword.value,
              icon: imgSrc,
              follow: [],
              follower: [],
              posts: [],
              favoritePosts: [],
              keepPosts: [],
              profile: profile.value,
            });
          }
        }
      });
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  const emailChange = (e: { target: HTMLButtonElement }) => {
    setRegisterEmail(e.target.value);
  };
  const passChange = (e: { target: HTMLButtonElement }) => {
    setRegisterPassword(e.target.value);
  };

  return (
    <>
      {/* 登録ボタンを押した時にhandleSubmitを実行 */}
      <form onSubmit={handleSubmit} style={{ lineHeight: "5rem" }}>
        <div style={{ width: "130px", height: "auto", margin: "0 auto" }}>
          {loading ? (
            <>
              <p>uploading</p>
              <input
                name="imageURL"
                id="iconImage"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={InputImage}
                style={{ display: "none" }}
              />
            </>
          ) : (
            <>
              {isUploaded ? (
                <div
                  style={{
                    borderRadius: "50%",
                    width: "120px",
                    height: "120px",
                    border: "solid 1px lightgray",
                  }}
                >
                  <img
                    alt="icon"
                    src={imgSrc}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              ) : (
                <>
                  <label htmlFor="iconImage">
                    <RegisterIcon />
                  </label>
                  <input
                    name="imageURL"
                    id="iconImage"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={InputImage}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </>
          )}
          {/* </label> */}
        </div>
        <p className="register_form_requiredText">＊：必須項目</p>
        {/* <div> */}
        <InputEmail
          emailChange={emailChange}
          valueEmail={registerEmail}
          requiredIcon={<span className="register_form_requiredIcon">＊</span>}
        />
        {/* <input
            type="email"
            name="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            placeholder="メールアドレス"
            style={{
              width: "80%",
              height: "35px",
              backgroundColor: "#f7f7f7",
              outline: "solid #d3d3d3",
              border: "none",
            }}
          /> */}
        {/* </div> */}

        <InputRequiredRegister
          type={"text"}
          name={"userName"}
          placeholder={"ユーザーID(半角英数字4文字以上) 例:kanako0123"}
          pattern={"^([a-zA-Z0-9]{4,})$"}
          message={"半角英数字4文字以上"}
        />
        {/* <div>
          <input
            type="text"
            name="userName"
            placeholder="ユーザーネーム"
            style={{
              width: "80%",
              height: "35px",
              backgroundColor: "#f7f7f7",
              outline: "solid #d3d3d3",
              border: "none",
            }}
          />
        </div> */}

        <InputRequiredRegister
          type={"text"}
          name={"name"}
          placeholder={"ネーム"}
        />
        {/* <div>
          <input
            type="text"
            name="name"
            placeholder="ネーム"
            style={{
              width: "80%",
              height: "35px",
              backgroundColor: "#f7f7f7",
              outline: "solid #d3d3d3",
              border: "none",
            }}
          />
        </div> */}

        <InputRegisterPass
          valuePassword={registerPassword}
          passChange={passChange}
        />
        {/* <div>
          <input
            type="password"
            name="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="パスワード"
            style={{
              width: "80%",
              height: "35px",
              backgroundColor: "#f7f7f7",
              outline: "solid #d3d3d3",
              border: "none",
            }}
          />
        </div> */}

        {/* <InputRequiredRegister type={"password"} name={"Cpassword"} placeholder={"確認用パスワード"} equal={"email"} /> */}
        <InputCPass passwordValue={registerPassword} />
        {/* <div>
          <input
            type="password"
            name="Cpassword"
            placeholder="確認用パスワード"
            style={{
              width: "80%",
              height: "35px",
              backgroundColor: "#f7f7f7",
              outline: "solid #d3d3d3",
              border: "none",
            }}
          />
        </div> */}

        <InputRegister
          type={"textarea"}
          name={"profile"}
          placeholder={"自己紹介"}
        />
        {/* <div>
          <input
            type="textarea"
            name="profile"
            placeholder="自己紹介"
            style={{
              width: "80%",
              height: "35px",
              backgroundColor: "#f7f7f7",
              outline: "solid #d3d3d3",
              border: "none",
            }}
          />
        </div> */}
        <RegisterButton />
      </form>
    </>
  );
}

export default RegisterForm;
