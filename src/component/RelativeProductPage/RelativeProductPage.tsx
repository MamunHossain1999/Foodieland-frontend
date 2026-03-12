import { useGetAllRecipesQuery, type Recipe, } from "@/Redux/api/recipeApi";

const RelativeProductPage = () => {
  interface RecipesResponse {
  success: boolean;
  recipes: Recipe[];
}
  const { data, isLoading, isError } = useGetAllRecipesQuery();

const recipes: Recipe[] = (data as unknown as RecipesResponse)?.recipes ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (isError || recipes.length === 0) return <p>No recipes found.</p>;

  const relativeRecipes = recipes.slice(0, 4); 

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {relativeRecipes?.map((recipe) => (
        <div key={recipe._id} className="bg-gray-100 p-4 rounded-lg">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-60 object-cover rounded-lg"
          />
          <h3 className="mt-2 font-semibold">{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default RelativeProductPage;
