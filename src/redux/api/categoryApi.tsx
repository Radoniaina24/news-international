import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
/* eslint-disable */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}
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
    getCategories: builder.query<string[], void>({
      query: () => "/categories-name",
      transformResponse: (response: Category[]): string[] =>
        response.map((cat) => cat.name),
    }),
    getCategoryById: builder.query<any, number>({
      query: (id) => `categories/${id}`,
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoriesAPI;
