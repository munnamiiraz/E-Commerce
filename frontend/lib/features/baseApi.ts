import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL 
  }),
  tagTypes: ['Cart', 'User', 'Product', 'Wishlist'],
  endpoints: () => ({}),
});
