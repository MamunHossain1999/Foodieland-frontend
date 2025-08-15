/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  ChefHat,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { useParams } from "react-router";
import { useGetAllRecipesQuery } from "../AllRecepis/allRecipeApi";
import NewsLetterPage from "@/component/NewsLetterPage/NewsLetterPage";
import RelativeProductPage from "@/component/RelativeProductPage/RelativeProductPage";
import RecipeDirections from "./RecipeDirections";
import type { Recipe } from "../AllRecepis/type";
import Article from "@/assets/blogImg/Rectangle 14 (2).jpg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const recipes1: Recipe[] = [
  {
    id: 1,
    title: "Chicken Meatballs with Green Beans",
    image:
      "https://i.ibb.co.com/vC1gj8Tj/f6995460a4292927efc17ee09591649f7a1b7364.png",
    author: "Andreas Ryan",
    category: "Main Course",
  },
  {
    id: 2,
    title: "Traditional Bolognese Ragu",
    image:
      "https://i.ibb.co.com/vC1gj8Tj/f6995460a4292927efc17ee09591649f7a1b7364.png",
    author: "Isabella Chen",
    category: "Pasta",
  },
  {
    id: 3,
    title: "Pork and Chive Chinese Dumplings",
    image:
      "https://i.ibb.co.com/vC1gj8Tj/f6995460a4292927efc17ee09591649f7a1b7364.png",
    author: "Marcus Liu",
    category: "Appetizer",
  },
];

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipes, isLoading, isError } = useGetAllRecipesQuery();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Product not found</div>;

  const recipe = recipes?.find((ar) => String(ar.id) === id);
  if (!recipe) return <div className="text-center py-10">Recipe not found</div>;

  return (
    <>
      <div className="container mx-auto px-4 lg:px-0 py-10">
        <h1
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          data-aos="fade-up"
        >
          {recipe.title}
        </h1>

        {/* Author & Date */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {recipe?.category}
            </span>
            <Calendar size={16} />
            <span className="text-gray-500">{recipe.date}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
            <span className="text-gray-500">Servings: {recipe.servings}</span>
            <span className="text-gray-500">Time: {recipe.time}</span>
          </div>
        </div>

        {/* Recipe Image + Table */}
        <div
          className="flex flex-col lg:flex-row gap-4 mt-6"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <div className="lg:flex-[2]" data-aos="zoom-in">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl"
            />
          </div>

          <div
            className="bg-[#E7FAFE] p-4 sm:p-6 rounded-xl lg:flex-1"
            data-aos="fade-left"
            data-aos-delay={300}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Nutrition Information
            </h2>

            <div className="overflow-x-auto rounded-xl shadow-sm">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3 border-b w-1/2">
                      Steps
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-700 px-4 py-3 border-b w-1/2">
                      Ingredients
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({
                    length: Math.max(
                      recipe?.steps?.length || 0,
                      recipe?.ingredients?.length || 0
                    ),
                  }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 align-top text-sm text-gray-700 border-b">
                        {recipe?.steps?.[i] || ""}
                      </td>
                      <td className="px-4 py-3 align-top text-sm text-gray-700 border-b">
                        {recipe?.ingredients?.[i] || ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-gray-600 mb-8 container mx-auto px-4"
        data-aos="fade-up"
        data-aos-delay={400}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </p>

      {/* Main Content */}
      <div
        className="container mx-auto flex flex-col lg:flex-row gap-6 px-4 lg:px-0"
        data-aos="fade-up"
        data-aos-delay={500}
      >
        <div className="lg:flex-[2]" data-aos="fade-right">
          <RecipeDirections />
        </div>

        {/* Sidebar */}
        <div className="flex-1 space-y-8" data-aos="fade-left">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center">
              <ChefHat className="mr-2 text-green-600" size={20} />
              Tasty Recipes
            </h3>
            <div className="space-y-4">
              {recipes1?.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full sm:w-[180px] h-[120px] rounded-lg object-cover"
                  />
                  <h4 className="font-semibold text-gray-900 text-base md:text-lg line-clamp-2">
                    {recipe.title}
                  </h4>
                </div>
              ))}
            </div>
            <img
              src={Article}
              alt="adds"
              className="mt-6 w-full rounded-lg"
              data-aos="zoom-in"
            />
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div
        className="flex flex-wrap gap-3 mt-10 container mx-auto px-4 pb-12"
        data-aos="fade-up"
        data-aos-delay={600}
      >
        <a
          href="#"
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <Facebook className="text-gray-600" />
        </a>
        <a
          href="#"
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <Twitter className="text-gray-600" />
        </a>
        <a
          href="#"
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <Instagram className="text-gray-600" />
        </a>
      </div>

      {/* Newsletter */}
      <div className="w-full mx-auto" data-aos="fade-up" data-aos-delay={700}>
        <NewsLetterPage />
      </div>

      {/* Relative Products */}
      <div
        className="container mx-auto px-4 lg:px-0 pt-12"
        data-aos="fade-up"
        data-aos-delay={800}
      >
        <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-center">
          You may like these recipe too
        </h3>
        <RelativeProductPage />
      </div>
    </>
  );
};

export default RecipeDetails;
