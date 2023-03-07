import { api } from '../api/api-slice';
import { IPost } from './posts-slice.types';

const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<IPost[], null>({
      query: () => ({
        url: 'posts',
      }),
    }),
  }),
});

const { useGetPostsQuery } = postsApi;

export { useGetPostsQuery };
