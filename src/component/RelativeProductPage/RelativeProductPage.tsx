/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllRecipesQuery } from "@/fetures/AllRecepis/allRecipeApi";

const RelativeProductPage = () => {
  const { data: recipes, isLoading, isError, error } = useGetAllRecipesQuery();

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {(error as any).message}
      </p>
    );

  return (
    <div className="container mx-auto px-4 md:px-0 my-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes?.slice(0, 4).map((recipe, index) => (
          <div
            key={recipe.id}
            data-aos="fade-up"
            data-aos-delay={index * 100} // stagger effect
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            style={{
              background:
                "linear-gradient(180deg, rgba(231, 249, 253, 0) 0%, #E7F9FD 100%)",
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-60 object-cover rounded-2xl"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h2>
            </div>
            <div className="flex justify-between items-center px-4 pb-4">
              <span className="text-gray-500 text-sm flex items-center gap-1">
                ⏱ {recipe.time}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                🍽 {recipe.servings} servings
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelativeProductPage;
