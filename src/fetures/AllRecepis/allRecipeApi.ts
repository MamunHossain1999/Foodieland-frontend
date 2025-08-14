// src/features/recipes/recipesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Recipe } from "./type";


export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // public folder root
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    // get all recipes
    getAllRecipes: builder.query<Recipe[], void>({
      query: () => "recipes.json",
      providesTags: ["Recipes"],
    }),

    // create a new recipe
    createRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (newRecipe) => ({
        url: "api/recipes",
        method: "POST",
        body: newRecipe,
      }),
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const { useGetAllRecipesQuery, useCreateRecipeMutation } = recipesApi;
