import { IPost, IPostsSliceState } from './posts-slice.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getPosts } from './posts-thunk';
import { search, sortList } from '../../pages/index/index.service';
import { IFiltersSet } from '../../pages/index/index.types';

const initialState: IPostsSliceState = {
  postsPerPage: 10,
  posts: [],
  preparedPosts: [],
  isFetching: false,
  error: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPreparedPosts: (state, { payload }: PayloadAction<IFiltersSet>) => {
      let filtredList = search(payload.search, state.posts);
      filtredList = sortList(payload.sort.filter, payload.sort.type, filtredList);
      state.preparedPosts = filtredList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(getPosts.fulfilled, (state, { payload }: PayloadAction<IPost[]>) => {
      state.posts = payload;
      state.isFetching = false;
    });

    builder.addCase(getPosts.rejected, (state, { payload }: PayloadAction<string | undefined>) => {
      state.error = payload ?? '';
      state.isFetching = false;
    });
  },
});

const postsReducer = postsSlice.reducer;
const { setPreparedPosts } = postsSlice.actions;

const selectAllPosts = (state: RootState) => state.posts.posts;
const selectPostsPerPage = (state: RootState) => state.posts.postsPerPage;
const selectIsFetching = (state: RootState) => state.posts.isFetching;
const selectError = (state: RootState) => state.posts.error;
const selectPostsState = (state: RootState) => state.posts;

export {
  postsReducer,
  selectAllPosts,
  selectPostsPerPage,
  selectIsFetching,
  selectError,
  selectPostsState,
  setPreparedPosts,
};
