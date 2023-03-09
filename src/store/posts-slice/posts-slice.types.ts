interface IPostsSliceState {
  postsPerPage: number;
  posts: IPost[];
  preparedPosts: IPost[];
  isFetching: boolean;
  error: string;
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type { IPost, IPostsSliceState };
