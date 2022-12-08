import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { MdAutorenew, MdOutlineChangeCircle } from "react-icons/md";

function UpdateIcon(props: any) {
  //loadingしているかしてないか監視する
  const [loading, setloading] = useState(false);
  // アップロードが完了したか確認する
  const [isUploaded, setIsUploaded] = useState(false);

  // 画像の更新
  const InputImage = (e: any) => {
    // パスと名前で参照を作成
    const file = e.target.files[0];
    const storageRef = ref(storage, "image/" + file.name);
    // 画像のアップロード
    const uploadImage = uploadBytesResumable(storageRef, file);
    uploadImage.on(
      "state_changed",
      // upload開始したらloading中になる(loadingがtureになる)
      () => {
        setloading(true);
      },
      (err) => {
        console.log(err);
      },
      //upload完了したらloadedになる(loadingがfalse,loadedがtrue)
      () => {
        setloading(false);
        setIsUploaded(true);
        // 画像のダウンロード
        getDownloadURL(storageRef).then((url) => {
          props.iconPropsFunc(url);
        });
      }
    );
  };
  return (
    <div>
       {loading ? (
              <p>アップロード中</p>
            ) : (
              <>
                {isUploaded ? (
                  <div className="upDateIcon">
                    <div>
                      <img
                        className="icon-image"
                        alt="ユーザーアイコン"
                        src={props.iconPropsValue}

                      />
                    </div>
                    <div className="upDateIcon__block">
                      <label className="upDateIcon__label">
                      <MdAutorenew size={30} color="white" />
                      <input
                        name="settingIcon"
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={InputImage}
                        className="upDateIcon__input"
                      />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      <img
                        className="icon-image"
                        alt="ユーザーアイコン"
                        src={props.iconPropsValue}
                      />
                    </div>
                    <div className="upDateIcon__block">
                      <label className="upDateIcon__label">
                        <MdAutorenew size={30} color="white" />
                      <input
                        name="settingIcon"
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={InputImage}
                        className="upDateIcon__input"
                      />
                      </label>
                    </div>
                  </div>
                )}
              </>
            )}
    </div>
  )
}

export default UpdateIcon
