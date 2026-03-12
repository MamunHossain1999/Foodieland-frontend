import ForgotPassword from "@/component/ForgotPassword/ForgotPassword";
import LoginPage from "@/component/LoginPage/LoginPage";
import ProfilePage from "@/component/ProfilePage/ProfilePage";
import RegisterPage from "@/component/RegisterPage/RegisterPage";
import ResetPassword from "@/component/ResetPassword/ResetPassword";
import UpdateProfile from "@/component/UpdateProfile/UpdateProfile";
import VerifyOtp from "@/component/VerifyOTP/VerifyOtp";
import RecipeAboutPage from "@/fetures/AboutUs/RecipeAboutPage";
import AddProduct from "@/fetures/AdminPage/AddProduct";
import AdminHome from "@/fetures/AdminPage/AdminHome";
import AdminProducts from "@/fetures/AdminPage/AdminProducts";
import AdminProfile from "@/fetures/AdminPage/AdminProfile";
import AdminUpdateProfile from "@/fetures/AdminPage/AdminUpdateProfile";
import MyOrders from "@/fetures/AdminPage/MyOrders";
import RecipesList from "@/fetures/AllRecepis/pages/RecipesList";
import Blog from "@/fetures/Blog/BlogPage";
import BlogPostPage from "@/fetures/blogPostPage/BlogPostPage";
import ContactForm from "@/fetures/Contact/ContactForm";
import HomePage from "@/fetures/Home/HomePage";
import RecipeDetails from "@/fetures/RecipeDetails/RecipeDetails";
import AdminDashboard from "@/layout/AdminDashboard";
import MainLayOut from "@/layout/MainLayOut";
import { createBrowserRouter } from "react-router";
import AllUsersPage from "@/fetures/AdminPage/AllUsersPage";
import UpdateProduct from "@/fetures/AdminPage/UpdateProduct";
import OrderDetails from "@/fetures/AdminPage/OrderDetails";
import UserOrderDetail from "@/component/UserOrderDeatalsPage/UserOrderDetail";
import UserMyOrder from "@/component/UserMyOrderPage/UserMyOrder";
import PrivateRoute from "@/PrivatePage/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/recipes",
        element: <PrivateRoute allowedRoles={["admin", "user"]}><RecipesList /></PrivateRoute>,
      },
      {
        path: "/recipes/:id",
        element: <PrivateRoute allowedRoles={["admin", "user"]}><RecipeDetails /></PrivateRoute>,
      },
      {
        path: "/blog",
        element: <PrivateRoute allowedRoles={["admin", "user"]}><Blog /></PrivateRoute>,
      },
      {
        path: "/blog/:id",
        element: <PrivateRoute allowedRoles={["admin", "user"]}><BlogPostPage /></PrivateRoute>,
      },
      {
        path: "/contact",
        element: <ContactForm />,
      },
      {
        path: "/about",
        element: <RecipeAboutPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/updateProfile",
        element: <UpdateProfile />
      },
      {
        path: "/reset-password",
        element: <ResetPassword />
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />
      },
        {
        path: "/my/orders",
        element: <PrivateRoute><UserMyOrder /></PrivateRoute>
      },
       {
        path: "/my/order/:id",
        element: <PrivateRoute><UserOrderDetail /></PrivateRoute>
      }
  
    ],
  },
  {
  path: "/admin",
  element: (
    <PrivateRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </PrivateRoute>
  ),
  children: [
    {
      path: "/admin",
      element: <PrivateRoute allowedRoles={["admin"]}><AdminHome /></PrivateRoute>,
    },
    {
      path: "/admin/products",
      element:<PrivateRoute allowedRoles={["admin"]}><AdminProducts /></PrivateRoute>,
    },
    {
      path: "/admin/add-product",
      element: <PrivateRoute allowedRoles={["admin"]}><AddProduct /></PrivateRoute>,
    },
    {
      path: "/admin/all-users",
      element: <PrivateRoute allowedRoles={["admin"]}><AllUsersPage /></PrivateRoute>,
    },
    {
      path: "/admin/profile",
      element: <PrivateRoute allowedRoles={["admin"]}><AdminProfile /></PrivateRoute>,
    },
    {
      path: "/admin/orders",
      element: <PrivateRoute allowedRoles={["admin"]}><MyOrders /></PrivateRoute>,
    },
    {
      path: "/admin/update-profile",
      element: <PrivateRoute allowedRoles={["admin"]}><AdminUpdateProfile /></PrivateRoute>,
    },
    {
      path: "/admin/update/product/:id",
      element: <PrivateRoute allowedRoles={["admin"]}><UpdateProduct /></PrivateRoute>,
    },
    {
      path: "/admin/order/:id",
      element: <PrivateRoute allowedRoles={["admin"]}><OrderDetails /></PrivateRoute>,
    }
  ]
}
]);