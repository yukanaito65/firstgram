import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { MdAutorenew } from "react-icons/md";

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
    <>
      {loading ? (
        <p>アップロード中</p>
      ) : (
        <>
          {isUploaded ? (
            <>
              {/* <label className="upDateIcon__label">
                <div className="icon-image upDateIcon__img">
                  <img
                    className="icon-image__img upDateIcon__img--parent"
                    alt="ユーザーアイコン"
                    src={props.iconPropsValue}
                  />
                  <MdAutorenew size={25} color="white" />
                </div>
              </label>
              <input
                name="settingIcon"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={InputImage}
                className="upDateIcon__input"
              /> */}
              <div className="upDateIcon__img">
                <label htmlFor="iconChange">
                  <div className="icon-image upDateIcon__img--imgBlock">
                    <img
                      className="icon-image__img"
                      alt="ユーザーアイコン"
                      src={props.iconPropsValue}
                    />
                  </div>
                  <div className="upDateIcon__label">
                    <MdAutorenew size={25} color="white" />
                  </div>
                </label>
              </div>

              <input
                name="settingIcon"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={InputImage}
                className="upDateIcon__input"
                id="iconChange"
              />
            </>
          ) : (
            <>
              <div className="upDateIcon__img">
                <label htmlFor="iconChange">
                  <div className="icon-image upDateIcon__img--imgBlock">
                    <img
                      className="icon-image__img"
                      alt="ユーザーアイコン"
                      src={props.iconPropsValue}
                    />
                  </div>
                  <div className="upDateIcon__label">
                    <MdAutorenew size={25} color="white" />
                  </div>
                </label>
              </div>

              <input
                name="settingIcon"
                type="file"
                accept=".png, .jpeg, .jpg"
                onChange={InputImage}
                className="upDateIcon__input"
                id="iconChange"
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default UpdateIcon;
