/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Search, Calendar, User, ChefHat } from "lucide-react";
import { useGetAllArticlesQuery } from "./blogApi";
import Article from "@/assets/blogImg/Rectangle 14 (2).jpg";
import NewsLetterPage from "@/component/NewsLetterPage/NewsLetterPage";
import { useNavigate } from "react-router";

interface Recipe {
  id: number;
  title: string;
  image: string;
  author: string;
  category: string;
}

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  //   pagination function
  const [currentPage, setCurrentPage] = useState(1);

  //   ata mouse reload jeno na kore
  const handleSearch = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const {
    data: articles,
    isLoading,
    isError,
    error,
  } = useGetAllArticlesQuery();

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {(error as any).message}
      </p>
    );

  const recipes: Recipe[] = [
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

  const filteredArticles = (articles ?? []).filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //   Pagination
  const ItemPerPage = 5;
  const indexOfLastItem = currentPage * ItemPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemPerPage;
  const currentItem = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredArticles.length / ItemPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleCardClick = (id: number) => {
    navigate(`/blog/${id}`);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Blog & Article
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles or recipes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2  text-black px-4 py-1.5 rounded-md transition-colors"
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {currentItem?.map((article) => (
                <button onClick={() => handleCardClick(article.id)} className="cursor-pointer">
                  <article
                    key={article.id}
                    className="rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 h-48 md:h-auto">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="mb-3">
                          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {article.category}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-center text-sm text-gray-500">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span className="mr-4">{article.author.name}</span>
                          <Calendar size={14} className="mr-1" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </button>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center space-x-2">
                {/* Prev button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>

                {/* Page numbers */}
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 justify-center flex">
            {/* Tasty Recipes Section */}
            <div className="">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ChefHat className="mr-2 text-green-600" size={20} />
                Tasty Recipes
              </h3>
              <div className="space-y-4">
                {recipes?.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-[180px] h-[107px] rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-semibold text-gray-900 text-xl line-clamp-6">
                        {recipe.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <User size={12} className="mr-1" />
                        <span>{recipe.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <img src={Article} alt="adds" className="mt-10" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <NewsLetterPage />
      </div>
    </div>
  );
};

export default BlogPage;
