import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});

export { api, BASE_URL };
