/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  ChefHat,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { useParams } from "react-router";
import { useState, useEffect } from "react";

import NewsLetterPage from "@/component/NewsLetterPage/NewsLetterPage";
import RecipeDirections from "./RecipeDirections";
import RelativeProductPage from "@/component/RelativeProductPage/RelativeProductPage";

import Article from "@/assets/blogImg/Rectangle 14 (2).jpg";

import AOS from "aos";
import "aos/dist/aos.css";

import { useGetRecipeDetailsQuery } from "@/Redux/api/recipeApi";
import { toast } from "react-toastify";

import {
  useToggleLikeMutation,
  useCheckUserLikedQuery,
  useGetLikeCountQuery,
} from "@/Redux/api/likeApi";

import {
  useCreateOrderMutation,
  useDeleteOrderMutation,
} from "@/Redux/api/orderApi";

const recipes1 = [
  {
    _id: "1",
    title: "Chicken Meatballs with Green Beans",
    image:
      "https://i.ibb.co.com/vC1gj8Tj/f6995460a4292927efc17ee09591649f7a1b7364.png",
  },
  {
    _id: "2",
    title: "Traditional Bolognese Ragu",
    image:
      "https://i.ibb.co.com/vC1gj8Tj/f6995460a4292927efc17ee09591649f7a1b7364.png",
  },
  {
    _id: "3",
    title: "Pork and Chive Chinese Dumplings",
    image:
      "https://i.ibb.co.com/vC1gj8Tj/f6995460a4292927efc17ee09591649f7a1b7364.png",
  },
];

export interface Recipe {
  _id?: string;
  title: string;
  category: string;
  servings?: string;
  time?: string;
  nutrition?: string;
  ingredients?: string[];
  steps?: string[];
  description?: string;
  image?: string;
  date?: string;
}

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [orderId, setOrderId] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetRecipeDetailsQuery(id!) as any;
  const recipe = data?.recipe;

  // ====== Like State ======
  const { data: checkLiked } = useCheckUserLikedQuery(recipe?._id || "", {
    skip: !recipe?._id,
  });
  const { data: likeCountData } = useGetLikeCountQuery(recipe?._id || "", {
    skip: !recipe?._id,
  });
  const [liked, setLiked] = useState(false);
  const [toggleLike] = useToggleLikeMutation();

  useEffect(() => {
    if (checkLiked !== undefined) setLiked(checkLiked.liked);
  }, [checkLiked]);

  // ====== Order State ======
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  
  const [deleteOrder] = useDeleteOrderMutation();

  // ====== AOS Animation ======
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // ====== Handlers ======
  const handleLike = async () => {
    if (!recipe?._id) return;
    try {
      const res = await toggleLike({ recipeId: recipe._id }).unwrap();
      setLiked(res.liked);
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to toggle like");
    }
  };

const handleOrderToggle = async () => {
  if (!recipe?._id) return;

  try {
    if (!orderPlaced) {
      const res = await createOrder({ recipeId: recipe._id }).unwrap();

      setOrderPlaced(true);
      setOrderId(res.order._id);

      toast.success("Recipe Ordered Successfully!");
    } else {
      if (!orderId) return;

      await deleteOrder(orderId).unwrap();

      setOrderPlaced(false);
      setOrderId(null);

      toast.success("Order Cancelled!");
    }
  } catch (error: any) {
    toast.error(error.data?.message || "Failed to process order");
  }
};

  if (isLoading) return <div>Loading...</div>;
  if (isError || !recipe)
    return <div className="text-center py-10">Recipe not found</div>;

  return (
    <>
      <div className="container mx-auto px-4 lg:px-0 py-10">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

        {/* Category + Time */}
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-3">
            {recipe.category && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {recipe.category}
              </span>
            )}
            {recipe.time && (
              <>
                <Calendar size={16} />
                <span>{recipe.time}</span>
              </>
            )}
          </div>
          {recipe.servings && (
            <span className="text-gray-500">Servings: {recipe.servings}</span>
          )}
        </div>

        {/* Image Section */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <div className="lg:flex-[2]">
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-80 object-cover rounded-xl"
              />
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              {/* Order Toggle */}
              <button
                onClick={handleOrderToggle}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${
                  orderPlaced
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <ShoppingCart size={18} />
                {orderPlaced ? "Delete Order" : "Order Now"}
              </button>

              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`p-2 rounded-full border ${
                  liked ? "bg-red-500 text-white" : "text-gray-600"
                }`}
              >
                <Heart size={20} fill={liked ? "white" : "none"} />
              </button>

              {/* Like Count */}
              <span className="text-gray-600 ml-2">
                {likeCountData?.count || 0} Likes
              </span>
            </div>
          </div>

          {/* Ingredients + Steps Table */}
          <div className="bg-[#E7FAFE] p-6 rounded-xl lg:flex-1">
            <h2 className="text-xl font-semibold mb-4">Recipe Information</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left pb-2">Steps</th>
                  <th className="text-left pb-2">Ingredients</th>
                </tr>
              </thead>

              <tbody>
                {Array.from({
                  length: Math.max(
                    recipe.steps?.length || 0,
                    recipe.ingredients?.length || 0
                  ),
                }).map((_, i) => (
                  <tr key={i}>
                    <td className="py-2 text-sm">{recipe.steps?.[i]}</td>
                    <td className="py-2 text-sm">{recipe.ingredients?.[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Description */}
      {recipe.description && (
        <p className="text-gray-600 container mx-auto px-4 mb-8">
          {recipe.description}
        </p>
      )}

      {/* Main Section */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 px-4">
        <div className="lg:flex-[2]">
          <RecipeDirections />
        </div>

        {/* Sidebar */}
        <div className="flex-1 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <ChefHat className="mr-2 text-green-600" size={20} />
              Tasty Recipes
            </h3>

            <div className="space-y-4">
              {recipes1.map((r) => (
                <div
                  key={r._id}
                  className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg"
                >
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-[120px] h-[80px] rounded-lg object-cover"
                  />
                  <h4 className="font-semibold">{r.title}</h4>
                </div>
              ))}
            </div>

            <img src={Article} alt="adds" className="mt-6 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-3 mt-10 container mx-auto px-4 pb-12">
        <a className="p-3 border rounded-full hover:bg-gray-100">
          <Facebook />
        </a>

        <a className="p-3 border rounded-full hover:bg-gray-100">
          <Twitter />
        </a>

        <a className="p-3 border rounded-full hover:bg-gray-100">
          <Instagram />
        </a>
      </div>

      {/* Newsletter */}
      <NewsLetterPage />

      {/* Related Recipes */}
      <div className="container mx-auto px-4 pt-12">
        <h3 className="text-3xl font-semibold mb-3 text-center">
          You may like these recipe too
        </h3>

        <RelativeProductPage />
      </div>
    </>
  );
};

export default RecipeDetails;