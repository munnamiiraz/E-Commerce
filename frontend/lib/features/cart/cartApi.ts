import { baseApi } from '../baseApi';
import type { CartItem } from '@/types/types';

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => ({
        url: "/get-cart",
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Cart']
    }),
    addToCart: builder.mutation<void, { id: string, quantity: number }>({
      query: (body) => ({
        url: "/add-to-cart",
        method: "POST",
        body,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ['Cart']
    }),
    removeFromCart: builder.mutation<void, { id: string }>({
      query: (body) => ({
        url: "/api/user/remove-from-cart",
        method: "POST",
        body,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ['Cart']
    }),
    updateCartItem: builder.mutation<void, { itemId: string, quantity: number }>({
      query: (body) => ({
        url: "/api/user/update-cart-item",
        method: "PUT",
        body,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ['Cart']
    }),
  }),
});

export const { 
  useGetCartQuery, 
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation
} = cartApi;