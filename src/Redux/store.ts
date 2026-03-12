import { instragramApi } from "@/component/InstragramPage/instragramApi";

import { blogApi } from "@/fetures/Blog/blogApi";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { recipeApi } from "./api/recipeApi";
import { orderApi } from "./api/orderApi";
import { likeApi } from "./api/likeApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // ✅ authApi reducer
    [recipeApi.reducerPath]: recipeApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [instragramApi.reducerPath]: instragramApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      recipeApi.middleware,
      orderApi.middleware,
      likeApi.middleware,
      instragramApi.middleware,
      blogApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
