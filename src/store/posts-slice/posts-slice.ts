import { IPost, IPostsSliceState } from './posts-slice.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState: IPostsSliceState = {
  currentPage: 1,
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<IPost[]>) => {
      state.posts = payload;
    },
  },
});

const postsReducer = postsSlice.reducer;
const {} = postsSlice.actions;

const selectPosts = (state: RootState) => state.posts.posts;

export { postsReducer, selectPosts };
