import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postAPI = createApi({
  reducerPath: "postAPI",
  tagTypes: ["posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: (params) => {
        return {
          url: `/posts`,
          method: "GET",
          params,
        };
      },
      providesTags: ["posts"],
    }),
  }),
});

export const { useGetAllPostQuery } = postAPI;
