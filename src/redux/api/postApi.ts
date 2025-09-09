import { WPBlogPost } from "@/types/Blog";
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
      // transformResponse: (response: WPBlogPost[], meta) => {
      //   // On lit les headers pour récupérer X-WP-Total et X-WP-TotalPages
      //   const total = meta?.response?.headers.get("X-WP-Total") ?? "0";
      //   const totalPages =
      //     meta?.response?.headers.get("X-WP-TotalPages") ?? "0";

      //   return {
      //     data: response,
      //     total: parseInt(total, 10),
      //     totalPages: parseInt(totalPages, 10),
      //   };
      // },
      providesTags: ["posts"],
    }),
    getAllPostWithTransformationResponse: builder.query({
      query: (params) => {
        return {
          url: `/posts`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: WPBlogPost[], meta) => {
        // On lit les headers pour récupérer X-WP-Total et X-WP-TotalPages
        const total = meta?.response?.headers.get("X-WP-Total") ?? "0";
        const totalPages =
          meta?.response?.headers.get("X-WP-TotalPages") ?? "0";

        return {
          posts: response,
          total: parseInt(total, 10),
          totalPages: parseInt(totalPages, 10),
        };
      },
      providesTags: ["posts"],
    }),

    getOneRecentPost: builder.query({
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

export const {
  useGetAllPostQuery,
  useGetAllPostWithTransformationResponseQuery,
  useGetOneRecentPostQuery,
} = postAPI;
