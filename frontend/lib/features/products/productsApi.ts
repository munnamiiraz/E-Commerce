import { baseApi } from '../baseApi';
import type { Product } from '@/types/types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => '/api/seller/get-all-products',
      transformResponse: (response: any) => response.data
    }),
    getBestSellingProducts: builder.query<Product[], void>({
      query: () => '/api/seller/get-best-selling-products',
      transformResponse: (response: any) => response.data
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/api/seller/get-product/${id}`,
      transformResponse: (response: any) => response.data[0]
    }),
  }),
});

export const { 
  useGetAllProductsQuery, 
  useGetBestSellingProductsQuery,
  useGetProductByIdQuery 
} = productsApi;