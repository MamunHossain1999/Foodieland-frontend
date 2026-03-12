/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import NewsLetterPage from "@/component/NewsLetterPage/NewsLetterPage";
import { useGetAllRecipesQuery } from "@/Redux/api/recipeApi";

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
  price?: number; // Added price
}

export default function RecipesList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const { data, isLoading, isError, error } = useGetAllRecipesQuery({ page, limit: PAGE_SIZE });
  const recipes = (data as any)?.recipes ?? [];
  const totalPages = (data as any)?.totalPages ?? 1;

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading recipes...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {(error as any).message}
      </p>
    );

  const handleClick = (id?: string) => {
    if (id) navigate(`/recipes/${id}`);
  };

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <div className="container mx-auto px-4 lg:px-0 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4 md:gap-0">
          <div className="flex-1 text-2xl lg:text-5xl md:text-3xl font-bold text-[#000000]">
            Explore Our Delicious Recipes
          </div>
          <div className="text-gray-600 text-base flex-1">
            Discover a variety of recipes to delight your taste buds and make
            cooking easier. From breakfast to desserts, find recipes for every meal.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe: Recipe) => (
            <div key={recipe._id}>
              <button
                onClick={() => handleClick(recipe._id)}
                className="cursor-pointer w-full"
              >
                <div
                  data-aos="fade-up"
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  style={{
                    background: "linear-gradient(180deg, rgba(231, 249, 253, 0) 0%, #E7F9FD 100%)",
                  }}
                >
                  <img
                    src={recipe.image || "/placeholder.jpg"}
                    alt={recipe.title}
                    className="w-full h-60 object-cover rounded-2xl"
                    loading="lazy"
                  />
                  <div className="p-4 flex justify-between h-full">
                    <div>
                      <h2 className="text-lg text-left font-semibold text-gray-800 mb-2">
                      {recipe.title}
                    </h2>
                    {recipe.category && (
                      <p className="text-sm text-left text-gray-500">{recipe.category}</p>
                    )}
                    </div>
                    <div>
                      {recipe.price !== undefined && (
                      <p className="text-sm text-left text-gray-700 font-semibold mt-1">
                        💰 ${recipe.price.toFixed(2)}
                      </p>
                    )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-4 pb-4">
                    {recipe.time && (
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        ⏱ {recipe.time}
                      </span>
                    )}
                    {recipe.servings && (
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        🍽 {recipe.servings} servings
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <NewsLetterPage />
    </>
  );
}