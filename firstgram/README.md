## プロジェクトタイトル
firstgram

## プロジェクトの概要
snsの画像投稿アプリを作成(instagram参考)

## 使用言語
- React
- TypeScript
- Sass(BEM)
- Firebase(Firestore Database,Storage,Authentication)
- Docker

### 機能一覧
- 画像・キャプションの投稿機能
- 投稿された画像・キャプションの閲覧機能
- 投稿の編集/削除機能
- 新規ユーザー登録機能
- ログイン/ログアウト機能
- 投稿に対するいいね機能
- 投稿に対するコメント機能
- ダイレクトメッセージ機能
- フォロー機能
- 登録ユーザーの検索機能
- 投稿の保存機能
- プロフィール編集機能
- ヘッダー/フッター

## ブランチ運用
- main          : リリース用のソースコード
- develop       : 開発中のソースコード
- feather/機能名 : 各機能のソースコード


## ディレクトリ構造
<pre>
firstgram
├── Dockerfile
├── README.md
├── docker-compose.yaml
├── firebase.json
├── package-lock.json
├── package.json
├── public
├── src
│   ├── App.tsx
│   ├── component
│   │   ├── atoms
│   │   │   ├── Input
│   │   │   ├── button
│   │   │   ├── icon
│   │   │   ├── pictures
│   │   │   └── user
│   │   ├── molecules
│   │   ├── organisms
│   │   ├── pages
│   │   └── utils
│   ├── css
│   ├── firebase.js
│   ├── index.css
│   ├── index.tsx
│   ├── rootReducer.ts
│   ├── sass
│   │   ├── component
│   │   │   ├── atoms
│   │   │   │   ├── button
│   │   │   │   ├── icon
│   │   │   │   ├── input
│   │   │   │   ├── pictures
│   │   │   │   └── user
│   │   │   ├── molecules
│   │   │   ├── organisms
│   │   │   ├── pages
│   │   │   └── templates
│   │   ├── foundation
│   │   ├── global
│   │   │   ├── mixin
│   │   │   └── setting
│   │   ├── style.css.map
│   │   ├── style.scss
│   └── types
│       └── types.ts
└── tsconfig.json
</pre>

- コンポーネントの切り分けはatomicデザインを意識して作成

## プロジェクトのスクリーンショット
### TOP画面(投稿一覧)
<img width="1080" alt="スクリーンショット 2022-12-14 17 43 45" src="https://user-images.githubusercontent.com/110379033/207548223-1482d0da-bfdd-4a30-8f9e-7e7929070abc.png">

### マイページ
<img width="1080" alt="スクリーンショット 2022-12-14 17 45 52" src="https://user-images.githubusercontent.com/110379033/207548678-899cf744-5d0f-4f99-a755-bc077946b5af.png">

### ダイレクトメッセージ画面
<img width="1080" alt="スクリーンショット 2022-12-14 17 47 29" src="https://user-images.githubusercontent.com/110379033/207549019-4a5e1014-4a44-40e0-888d-e9e6baf35116.png">

### 検索ページ
<img width="1080" alt="スクリーンショット 2022-12-14 17 48 01" src="https://user-images.githubusercontent.com/110379033/207549138-9998c053-66ab-4f07-b497-33a534abd316.png">

### プロフィール画面
<img width="1080" alt="スクリーンショット 2022-12-14 17 48 28" src="https://user-images.githubusercontent.com/110379033/207549221-ffbe3ea9-7f5f-4878-9dcc-086592b7c450.png">

