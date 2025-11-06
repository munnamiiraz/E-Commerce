import { baseApi } from '../baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: "/api/user/get-profile",
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['User']
    }),
  }),
});

export const { 
  useGetUserProfileQuery
} = userApi;