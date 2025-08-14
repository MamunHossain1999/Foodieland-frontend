import RecipeAboutPage from "@/fetures/AboutUs/RecipeAboutPage";
import RecipesList from "@/fetures/AllRecepis/pages/RecipesList";
import Blog from "@/fetures/Blog/BlogPage";
import BlogPostPage from "@/fetures/blogPostPage/BlogPostPage";
import ContactForm from "@/fetures/Contact/ContactForm";
import HomePage from "@/fetures/Home/HomePage";
import RecipeDetails from "@/fetures/RecipeDetails/RecipeDetails";
import MainLayOut from "@/layout/MainLayOut";
import { createBrowserRouter } from "react-router";

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
        element: <RecipesList />,
      },
      {
        path: "/recipes/:id",
        element: <RecipeDetails />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogPostPage />,
      },
      {
        path: "/contact",
        element: <ContactForm />,
      },
      {
        path: "/about",
        element: <RecipeAboutPage />,
      },
    ],
  },
]);