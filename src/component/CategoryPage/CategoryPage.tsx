/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllRecipesQuery } from "@/fetures/AllRecepis/allRecipeApi";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Category {
  name: string;
  icon: string;
  color: string;
}

const categories: Category[] = [
  {
    name: "Breakfast",
    icon: "🍳",
    color: "bg-gradient-to-br from-orange-100 to-orange-200",
  },
  {
    name: "Vegan",
    icon: "🥬",
    color: "bg-gradient-to-br from-green-100 to-green-200",
  },
  {
    name: "Meat",
    icon: "🥩",
    color: "bg-gradient-to-br from-red-100 to-red-200",
  },
  {
    name: "Dessert",
    icon: "🍰",
    color: "bg-gradient-to-br from-yellow-100 to-yellow-200",
  },
  {
    name: "Lunch",
    icon: "🍱",
    color: "bg-gradient-to-br from-blue-100 to-blue-200",
  },
  {
    name: "Chocolate",
    icon: "🍫",
    color: "bg-gradient-to-br from-amber-100 to-amber-200",
  },
];

const CategoryPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("Breakfast");
  const { data: recipes, isLoading, isError, error } = useGetAllRecipesQuery();

  // recipe filtering (activeCategory was set)
  const filteredRecipes = activeCategory
    ? recipes?.filter((recipe) => recipe.category === activeCategory)
    : recipes;

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {(error as any).message}
      </p>
    );

  return (
    <div className="container mx-auto px-4 lg:px-0 py-10">
      {/* Categories Section */}
      <section>
        <div className="flex items-center h-auto justify-between mb-12">
          <h3 className="text-3xl font-bold text-gray-900">Categories</h3>
          {/* <button
            onClick={() => setActiveCategory(null)}
            className={`font-medium ${
              activeCategory === null
                ? "text-blue-700 underline"
                : "text-blue-600 cursor-pointer hover:text-blue-700"
            }`}
            
          >
            View all categories
          </button> */}
          <button
            onClick={() => navigate("/recipes")}
            className="font-medium text-blue-600 cursor-pointer hover:text-blue-700 hover:underline"
          >
            View all categories
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-14">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`${
                category.color
              } p-6 rounded-3xl text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                activeCategory === category.name ? "ring-4 ring-blue-500" : ""
              }`}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <p className="font-semibold text-gray-900">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recipes Section */}
      <section>
        {/* header title */}
        <div className="text-center mb-12 px-4">
          <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-[#000000]">
            Simple and tasty recipes
          </h3>
          <p className="text-[#00000099] font-normal text-sm sm:text-base max-w-[706px] mx-auto mt-4">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliquut enim ad minim.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          {activeCategory ? `Recipes: ${activeCategory}` : "All Recipes"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRecipes?.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-[#E7F9FD] rounded-[30px] shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-56 object-cover p-4 rounded-[30px]"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {recipe.title}
                </h3>
                {/* প্রয়োজনে আরও ইনফো */}
              </div>
            </div>
          ))}
          {filteredRecipes?.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              No recipes found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
