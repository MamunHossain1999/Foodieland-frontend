/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include", // cookie পাঠানোর জন্য
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // Register
    registerUser: builder.mutation<
      any,
      { name: string; email: string; password: string; role: "user" | "admin" }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Login
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Logout
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // Get Profile
    getProfile: builder.query<any, void>({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),

    // all users for admin
    getAllUsers: builder.query<any, void>({
      query: () => "/auth/users",
      providesTags: ["Auth"],
    }),

    // Update Profile
    updateProfile: builder.mutation<
      any,
      {
        name?: string;
        email?: string;
        password?: string;
        location?: string;
        bio?: string;
        skills?: string;
      }
    >({
      query: (body) => ({
        url: "/auth/update-profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Forgot Password
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<
      { message: string },
      { email: string; otp: string; newPassword: string }
    >({
      query: ({ email, otp, newPassword }) => ({
        url: `/auth/reset-password`,
        method: "PUT",
        body: { email, otp, newPassword }, 
      }),
    }),
    // Verify OTP
    verifyOtp: builder.mutation<
      { message: string },
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    // Resend OTP
    resendOtp: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

        // Update User Role (Admin)
    updateUserRole: builder.mutation<any, { id: string; role: "user" | "admin" }>({
      query: ({ id, role }) => ({
        url: `/auth/user/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Auth"],
    }),

    // Delete User (Admin)
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/auth/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

// Export hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation
} = authApi;
