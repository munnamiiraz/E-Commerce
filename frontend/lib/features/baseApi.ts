import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL 
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<any[], void>({
      query: () => '/api/seller/get-all-products',
      transformResponse: (response: any) => response.data
    }),
    getBestSellingProducts: builder.query<any[], void>({
      query: () => '/api/seller/get-best-selling-products',
      transformResponse: (response: any) => response.data
    })
  }),
});

export const { useGetAllProductsQuery, useGetBestSellingProductsQuery } = baseApi;
