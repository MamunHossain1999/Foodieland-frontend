/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetRecipeDetailsQuery, useUpdateRecipeMutation } from "@/Redux/api/recipeApi";

interface RecipeForm {
  title?: string;
  category?: string;
  nutrition?: string;
  ingredients?: string; // stringified array for textarea
  steps?: string;       // stringified array for textarea
  description?: string;
  price?: number;
  image?: File | string | null;
}

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetRecipeDetailsQuery(id!);
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();

  const [recipe, setRecipe] = useState<RecipeForm>({
    title: "",
    category: "",
    nutrition: "",
    ingredients: "",
    steps: "",
    description: "",
    price: undefined,
    image: null,
  });

  // Populate form with fetched data
  useEffect(() => {
    if (data) {
      setRecipe({
        title: data.title,
        category: data.category,
        nutrition: data.nutrition,
        ingredients: Array.isArray(data.ingredients) ? data.ingredients.join("\n") : data.ingredients,
        steps: Array.isArray(data.steps) ? data.steps.join("\n") : data.steps,
        description: data.description,
        price: data.price,
        image: data.image || null,
      });
    }
  }, [data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setRecipe((prev) => ({ ...prev, image: file }));
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`http://localhost:5000/api/products/${id}/update-image`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Image upload failed");
    return result.recipe.image; // return updated image URL
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const updatedData: any = {};

      if (recipe.title) updatedData.title = recipe.title;
      if (recipe.category) updatedData.category = recipe.category;
      if (recipe.nutrition) updatedData.nutrition = recipe.nutrition;
      if (recipe.ingredients)
        updatedData.ingredients = recipe.ingredients.split("\n").map((i) => i.trim()).filter(Boolean);
      if (recipe.steps)
        updatedData.steps = recipe.steps.split("\n").map((s) => s.trim()).filter(Boolean);
      if (recipe.description) updatedData.description = recipe.description;
      if (recipe.price !== undefined) updatedData.price = recipe.price;

      // If image is a new file, upload first
      if (recipe.image instanceof File) {
        const imageUrl = await uploadImage(recipe.image);
        updatedData.image = imageUrl;
      }

      await updateRecipe({ id: id!, formData: updatedData }).unwrap();
      toast.success("Recipe updated successfully!");
      navigate("/admin/products");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || err.message || "Update failed");
    }
  };

  if (isLoading) return <p>Loading recipe...</p>;
  if (error) return <p>Error loading recipe</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Update Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipe.title || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          value={recipe.category || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={recipe.price ?? ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="nutrition"
          placeholder="Nutrition Info"
          value={recipe.nutrition || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (one per line)"
          value={recipe.ingredients || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <textarea
          name="steps"
          placeholder="Steps (one per line)"
          value={recipe.steps || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={recipe.description || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full"
          onChange={handleFileChange}
        />

        {recipe.image && typeof recipe.image === "string" && (
          <img
            src={recipe.image}
            alt="Current"
            className="w-32 h-32 object-cover mt-2 rounded"
          />
        )}

        <button
          type="submit"
          disabled={isUpdating}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Update Recipe"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;