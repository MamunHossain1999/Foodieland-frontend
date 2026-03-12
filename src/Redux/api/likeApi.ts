import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LikeResponse {
  liked: boolean;
  message: string;
}

export interface LikeCountResponse {
  count: number;
}

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include", 
  }),
  tagTypes: ["Like"],
  endpoints: (builder) => ({
    // ================== TOGGLE LIKE ==================
    toggleLike: builder.mutation<LikeResponse, { recipeId: string }>({
      query: ({ recipeId }) => ({
        url: "/like",
        method: "POST",
        body: { recipeId },
      }),
      invalidatesTags: ["Like"],
    }),

    // ================== GET LIKE COUNT ==================
    getLikeCount: builder.query<LikeCountResponse, string>({
      query: (recipeId) => `/recipes/${recipeId}/likes`,
      providesTags: ["Like"],
    }),

    // ================== CHECK IF USER LIKED ==================
    checkUserLiked: builder.query<{ liked: boolean }, string>({
      query: (recipeId) => `/recipes/${recipeId}/liked`,
      providesTags: ["Like"],
    }),
  }),
});

export const {
  useToggleLikeMutation,
  useGetLikeCountQuery,
  useCheckUserLikedQuery,
} = likeApi;
