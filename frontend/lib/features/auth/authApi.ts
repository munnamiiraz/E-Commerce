import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sign } from 'crypto';
import { baseApi } from '../baseApi';
import { LoginFormData, SignupFormData } from '@/types/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<any, LoginFormData>({
      query: (body) => ({
        url: "/api/user/sign-in",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response.data
    }),
    signUp: builder.mutation<any, {name: string, email: string, password: string}>({
      query: (body) => ({
        url: "/api/user/sign-up",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response.data
    })
  }),
});

export const { useSignInMutation, useSignUpMutation} = authApi;
