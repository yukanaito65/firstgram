import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

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
                  <div>
                    <div className="setting_table_title">
                      <img
                        className="icon-image"
                        alt="ユーザーアイコン"
                        src={props.iconPropsValue}

                      />
                    </div>
                    <div className="setting_table_content">
                      <input
                        name="settingIcon"
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={InputImage}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="setting_table_title">
                      <img
                        className="icon-image"
                        alt="ユーザーアイコン"
                        src={props.iconPropsValue}
                      />
                    </div>
                    <div className="setting_table_content">
                      <input
                        name="settingIcon"
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={InputImage}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
    </div>
  )
}

export default UpdateIcon
