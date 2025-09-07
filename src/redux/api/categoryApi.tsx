import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesAPI = createApi({
  reducerPath: "categoriesAPI",
  tagTypes: ["posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: "include",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (params) => {
        return {
          url: `/categories`,
          method: "GET",
          params,
        };
      },
      providesTags: ["posts"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesAPI;
