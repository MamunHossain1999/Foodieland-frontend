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
  return (
    <div>
      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-bold text-gray-900">Categories</h3>
          <button className="text-blue-600 font-medium hover:text-blue-700">
            View all categories
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories?.map((category, index) => (
            <div
              key={index}
              className={`${category.color} p-6 rounded-3xl text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <p className="font-semibold text-gray-900">{category.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
