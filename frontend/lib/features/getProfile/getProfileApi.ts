import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sign } from 'crypto';
import { baseApi } from '../baseApi';
import { get } from 'http';

export const getProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: (body) => ({
        url: "/api/user/get-profile",
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`, // or from redux
        },
      }),
      transformResponse: (response: any) => response.data
    }),
  }),
});

export const { useGetProfileQuery} = getProfileApi;
