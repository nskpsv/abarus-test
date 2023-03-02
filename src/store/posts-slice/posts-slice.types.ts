interface IPostsSliceState {
  currentPage: number;
  posts: IPost[];
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type { IPost, IPostsSliceState };
