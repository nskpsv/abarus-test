import { IPost, IPostsSliceState } from './posts-slice.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState: IPostsSliceState = {
  currentPostsList: [],
  currentPage: 1,
  postsPerPage: 10,
  posts: [],
  filters: {
    search: '',
    sort: {
      body: 'ascending',
      id: 'ascending',
      title: 'ascending',
    },
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<IPost[]>) => {
      state.posts = payload;
    },
    setCurrentPostsList: (state, { payload }: PayloadAction<IPost[]>) => {
      state.currentPostsList = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
      
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.filters.search = payload;
    },
    setSort: (state, { payload }: PayloadAction<Record<string, 'ascending' | 'descending'>>) => {
      state.filters.sort = {
        body: 'ascending',
        id: 'ascending',
        title: 'ascending',
      };

      switch (Object.keys(payload)[0]) {
        case 'id': {
          state.filters.sort.id = payload.id;
          break;
        }
        case 'title': {
          state.filters.sort.title = payload.title;
          break;
        }
        case 'body': {
          state.filters.sort.body = payload.body;
          break;
        }
      }
    },
  },
});

const postsReducer = postsSlice.reducer;
const { setPosts, setCurrentPage, setCurrentPostsList, setSearch } = postsSlice.actions;

const selectAllPosts = (state: RootState) => state.posts.posts;
const selectCurrentPostsList = (state: RootState) => state.posts.currentPostsList;
const selectPostsPerPage = (state: RootState) => state.posts.postsPerPage;
const selectCurrentPage = (state: RootState) => state.posts.currentPage;

export {
  postsReducer,
  selectAllPosts,
  selectCurrentPostsList,
  selectPostsPerPage,
  selectCurrentPage,
  setSearch,
  setPosts,
  setCurrentPage,
  setCurrentPostsList,
};
