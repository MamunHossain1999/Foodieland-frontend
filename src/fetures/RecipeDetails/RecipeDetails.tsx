/* eslint-disable @typescript-eslint/no-explicit-any */

import { Calendar, Facebook, Instagram, Twitter } from "lucide-react";
import { useParams } from "react-router";
import { useGetAllRecipesQuery } from "../AllRecepis/allRecipeApi";
import NewsLetterPage from "@/component/NewsLetterPage/NewsLetterPage";
import RelativeProductPage from "@/component/RelativeProductPage/RelativeProductPage";
import cookieImg from "@/assets/bookpostImg/a18924703d3ad37c1b04115b9d86b67b82023a90.png";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipes, isLoading, isError } = useGetAllRecipesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Product not found</div>;

  const recipe = recipes?.find((ar) => String(ar.id) === id);
  if (!recipe) return <div className="text-center py-10">Recipe not found</div>;
  console.log(recipe);
  console.log(id);

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {recipe.title}
        </h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />

        <div className="flex items-center gap-3 mb-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {recipe?.category}
          </span>
          <Calendar size={16} />
          <span className="text-gray-500">{recipe.date}</span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <img
            src={recipe?.author?.avatar}
            alt={recipe.author?.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-700">{recipe.author?.name}</span>
        </div>

        <p className="text-gray-600 mb-8">{recipe.description}</p>

        <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc list-inside mb-8">
          {recipe?.ingredients?.map((ing, i) => (
            <li key={i} className="text-gray-700">
              {ing}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-3">Steps</h2>
        <ol className="list-decimal list-inside space-y-2">
          {recipe?.steps?.map((step, i) => (
            <li key={i} className="text-gray-700">
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Sections */}
      <div className="space-y-8 container mx-auto px-4 lg:px-0 py-10">
        <div>
          <h2 className="text-xl font-bold mb-2">
            How did you start out in the food industry?
          </h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            eu risus id massa dapibus, sit amet gravida ligula.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            What do you like most about your job?
          </h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            eu risus id massa dapibus, sit amet gravida ligula.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            Do you cook at home on your days off?
          </h2>
          <img
            src={cookieImg}
            alt="Cooking at home"
            className="w-full rounded-xl mb-3 h-[500px]"
          />
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            eu risus id massa dapibus, sit amet gravida ligula.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">
            What would your advice be to young people looking to get their foot
            in the door?
          </h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            eu risus id massa dapibus, sit amet gravida ligula.
          </p>
        </div>

        <blockquote className="italic text-xl font-medium text-gray-900 border-l-4 border-gray-300 pl-4">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac
          ultrices odio."
        </blockquote>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            What is the biggest misconception that people have about being a
            professional chef?
          </h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            eu risus id massa dapibus, sit amet gravida ligula.
          </p>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex space-x-3 mt-10 container mx-auto px-4 lg:px-0 py-10">
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
      <div>
        <NewsLetterPage />
      </div>
      <div className="container mx-auto px-4 pt-12">
        <h3 className="text-3xl font-semibold mb-3 text-center mt-12">
          You may like these recipe too
        </h3>
        <RelativeProductPage />
      </div>
    </>
  );
};

export default RecipeDetails;
