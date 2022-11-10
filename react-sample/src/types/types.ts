export type User = {
  userId: number;
  userName: string;
  name: string;
  icon: string;
  email: string;
  password: string;
  Cpassword: string;
  follow: []; //userIdを格納
  follower: []; //userIdを格納
  favoritePost: []; //postIdを格納
  post: []; //postドキュメントidを格納
};

export type Post = {
  postId: number;
  userId: number; //ユーザーのuserId
  imageUrl: [];
  caption: string;
  postDate: Date;
  favorites: []; //userNameを格納
};

export type Comment = {
  commentId: number;
  comment: string;
  commentTimestamp: Date;
  hashtag: string;
};
