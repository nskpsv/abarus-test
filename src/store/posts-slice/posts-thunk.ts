import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from './posts-slice.types';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const getPosts = createAsyncThunk<IPost[], undefined, { rejectValue: string }>(
  'posts/getPosts',
  async (_, thunkAPI) => {
    const response = await fetch(`${BASE_URL}posts`);

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Не удалось загрузить посты');
    }

    return await response.json();
  },
);

export { getPosts };
