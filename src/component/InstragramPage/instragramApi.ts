

// src/features/recipes/recipesApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "./type";



export const instragramApi = createApi({
  reducerPath: "instragramApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // public folder root
  tagTypes: ["Instragram"],
  endpoints: (builder) => ({
    // get all recipes
    getInstragram: builder.query<Post[], void>({
      query: () => "instragram.json",
      providesTags: ["Instragram"],
    }),

}), 
});

export const { useGetInstragramQuery } = instragramApi;

