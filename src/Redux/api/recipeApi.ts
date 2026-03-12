import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Recipe type interface
export interface Recipe {
  _id: string;
  title: string;
  category: string;
  nutrition?: string;
  ingredients: string[];
  steps: string[];
  description?: string;
  price?: number;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Recipe"],
  endpoints: (builder) => ({
    // Get All Recipes
    getAllRecipes: builder.query<Recipe[], { page?: number; limit?: number } | void>({
      query: ({ page = 1, limit = 20 } = {}) => `/all/recipes?page=${page}&limit=${limit}`,
      providesTags: ["Recipe"],
    }),

    // Get Recipe Details
    getRecipeDetails: builder.query<Recipe, string>({
      query: (id) => `/recipe/${id}`,
      providesTags: ["Recipe"],
    }),

    // Update Recipe
    updateRecipe: builder.mutation<Recipe, { id: string; formData: Partial<Omit<Recipe, "_id" | "createdAt" | "updatedAt">> | FormData }>({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Recipe"],
    }),

    // Delete Recipe
    deleteRecipe: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetAllRecipesQuery,
  useGetRecipeDetailsQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;