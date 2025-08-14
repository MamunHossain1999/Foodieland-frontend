// src/features/recipes/recipesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Article } from "./type";


export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // public folder root
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    // get all articles
    getAllArticles: builder.query<Article[], void>({
      query: () => "articles.json",
      providesTags: ["Articles"],
    }),

    // create a new article
    createArticle: builder.mutation<Article, Partial<Article>>({
      query: (newArticle) => ({
        url: "api/articles",
        method: "POST",
        body: newArticle,
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const { useGetAllArticlesQuery, useCreateArticleMutation } = blogApi ;
