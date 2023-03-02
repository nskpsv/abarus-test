import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api-slice';
import { postsReducer } from './posts-slice/posts-slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { AppDispatch, RootState };
