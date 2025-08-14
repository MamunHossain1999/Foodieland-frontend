
import { instragramApi } from '@/component/InstragramPage/instragramApi'
import { recipesApi } from '@/fetures/AllRecepis/allRecipeApi'
import { blogApi } from '@/fetures/Blog/blogApi'

import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
  reducer: {
    [recipesApi.reducerPath]: recipesApi.reducer,
    [instragramApi.reducerPath]: instragramApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(recipesApi.middleware, 
  instragramApi.middleware,
  blogApi.middleware,)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch