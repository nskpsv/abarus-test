interface IPostsSliceState {
  currentPage: number;
  currentPostsList: IPost[];
  postsPerPage: number;
  posts: IPost[];
  filters: {
    search: string;
    sort: {
      id: 'ascending' | 'descending';
      title: 'ascending' | 'descending';
      body: 'ascending' | 'descending';
    };
  };
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type { IPost, IPostsSliceState };
