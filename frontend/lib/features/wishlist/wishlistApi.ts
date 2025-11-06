import { baseApi } from '../baseApi';
import type { Product } from '@/types/types';

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<Product[], void>({
      query: () => ({
        url: "/api/user/wishlist",
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Wishlist']
    }),
    addToWishlist: builder.mutation<void, { productId: string }>({
      query: (body) => ({
        url: "/api/user/add-to-wishlist",
        method: "POST",
        body,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ['Wishlist']
    }),
    removeFromWishlist: builder.mutation<void, { productId: string }>({
      query: (body) => ({
        url: "/api/user/remove-from-wishlist",
        method: "DELETE",
        body,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ['Wishlist']
    }),
  }),
});

export const { 
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation
} = wishlistApi;