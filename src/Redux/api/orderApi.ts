import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ================== TYPES ==================
export interface RecipeInfo {
  _id: string;
  title: string;
  // optional fields
  ingredients?: string[];
  steps?: string[];
  price?: number;
  image?: string;
}

export interface UserInfo {
  _id: string;
  name: string;
}

export interface Order {
  _id: string;
  recipeId: RecipeInfo;
  userId: UserInfo; // populated user object
  status: "Pending" | "Delivered" | "Cancelled";
}

export interface CreateOrderResponse {
  message: string;
  order: Order;
}

interface CreateOrderRequest {
  recipeId: string;
}

// ================== API ==================
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://foodieland-server.vercel.app/api" ,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // ========== CREATE ORDER ==========
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    // ========== GET ORDER HISTORY ==========
    getOrderHistory: builder.query<Order[], void>({
      query: () => "/orders/history",
      providesTags: ["Order"],
    }),

    // ========== DELETE ORDER ==========
    deleteOrder: builder.mutation<{ message: string }, string>({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),

    // ========== GET SINGLE ORDER ==========
    getSingleOrder: builder.query<Order, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ["Order"],
    }),

    // ========== UPDATE ORDER STATUS ==========
    updateOrderStatus: builder.mutation<
      { message: string; order: { _id: string; status: "Pending" | "Delivered" | "Cancelled" } },
      { orderId: string; status: "Pending" | "Delivered" | "Cancelled" }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

// ================== HOOKS ==================
export const {
  useCreateOrderMutation,
  useGetOrderHistoryQuery,
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;