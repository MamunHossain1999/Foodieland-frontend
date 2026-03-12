/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface RecipeForm {
  title: string;
  category: string;
  servings: string;
  time: string;
  nutrition: string;
  ingredients: string[];
  steps: string[];
  description: string;
  image: File | null;
  price: number; // number type
}

const AddProduct = () => {
  const [recipe, setRecipe] = useState<RecipeForm>({
    title: "",
    category: "",
    servings: "",
    time: "",
    nutrition: "",
    ingredients: [""],
    steps: [""],
    description: "",
    image: null,
    price: 0, // initial value
  });

  const [isLoading, setIsLoading] = useState(false);

  // Input change for string fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "price") {
      setRecipe((prev) => ({ ...prev, price: Number(value) }));
    } else {
      setRecipe((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Ingredients/Steps change
  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: "ingredients" | "steps"
  ) => {
    const value = e.target.value;
    const arr = [...recipe[field]];
    arr[index] = value;
    setRecipe((prev) => ({ ...prev, [field]: arr }));
  };

  // Add new ingredient/step
  const handleAddField = (field: "ingredients" | "steps") => {
    setRecipe((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  // Remove ingredient/step
  const handleRemoveField = (index: number, field: "ingredients" | "steps") => {
    const arr = [...recipe[field]];
    arr.splice(index, 1);
    setRecipe((prev) => ({ ...prev, [field]: arr }));
  };

  // File change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setRecipe((prev) => ({ ...prev, image: file }));
  };

  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!recipe.image) {
      toast.error("Please select an image");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", recipe.title);
      formData.append("category", recipe.category);
      formData.append("servings", recipe.servings);
      formData.append("time", recipe.time);
      formData.append("nutrition", recipe.nutrition);
      formData.append("description", recipe.description);
      formData.append("price", recipe.price.toString()); // number to string
      formData.append("image", recipe.image);

      // Append array fields
      recipe.ingredients.forEach((ing, i) => formData.append(`ingredients[${i}]`, ing));
      recipe.steps.forEach((step, i) => formData.append(`steps[${i}]`, step));

      const res = await axios.post("http://localhost:5000/api/products/add", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Product Added:", res.data);
      toast.success("Product added successfully!");

      // Reset form
      setRecipe({
        title: "",
        category: "",
        servings: "",
        time: "",
        nutrition: "",
        ingredients: [""],
        steps: [""],
        description: "",
        image: null,
        price: 0,
      });
    } catch (error: any) {
      console.error("Error adding product:", error?.response?.data || error.message);
      toast.error("Upload failed: " + (error?.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Product / Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={recipe.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={recipe.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Vegan</option>
          <option value="Snack">Meat</option>
          <option value="Dessert">Dessert</option>
          <option value="Chocolate">Chocolate</option>
        </select>

        <input
          type="text"
          name="servings"
          placeholder="Servings"
          value={recipe.servings}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Time */}
        <select
          name="time"
          value={recipe.time}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Time</option>
          {Array.from({ length: 24 }, (_, i) => (i + 1) * 5).map((t) => (
            <option key={t} value={`${t} Minutes`}>
              {t} Minutes
            </option>
          ))}
        </select>

        <input
          type="text"
          name="nutrition"
          placeholder="Nutrition Info"
          value={recipe.nutrition}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={recipe.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Ingredients */}
        <div>
          <label className="font-semibold">Ingredients</label>
          {recipe.ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <input
                type="text"
                value={ing}
                onChange={(e) => handleArrayChange(e, i, "ingredients")}
                className="w-full border p-2 rounded"
                required
              />
              <button type="button" onClick={() => handleRemoveField(i, "ingredients")} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField("ingredients")} className="mt-2 text-blue-500">Add Ingredient</button>
        </div>

        {/* Steps */}
        <div>
          <label className="font-semibold">Steps</label>
          {recipe.steps.map((step, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <input
                type="text"
                value={step}
                onChange={(e) => handleArrayChange(e, i, "steps")}
                className="w-full border p-2 rounded"
                required
              />
              <button type="button" onClick={() => handleRemoveField(i, "steps")} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddField("steps")} className="mt-2 text-blue-500">Add Step</button>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={recipe.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;