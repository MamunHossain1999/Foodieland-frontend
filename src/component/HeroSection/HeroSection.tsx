

const HeroSection = () => {
    return (
    <div>
            {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Left Content */}
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 bg-[#E6FAFD] p-4 rounded-lg">
            <div className="bg-white px-4 py-2 rounded-full inline-block mb-4">
              <span className="text-sm font-medium text-gray-700">🔥 Hot Recipes</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Spicy delicious chicken wings
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex items-center space-x-6 mb-8">
              <div className="bg-black text-white px-6 py-3 rounded-xl font-medium cursor-pointer hover:bg-gray-800 transition-colors">
                30 Minutes
              </div>
              <div className="bg-gray-100 px-6 py-3 rounded-xl font-medium">
                Chicken
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                alt="Chef"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">John Smith</p>
                <p className="text-sm text-gray-600">15 March 2022</p>
              </div>
              <button className="ml-auto bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                View Recipes →
              </button>
            </div>
          </div>
          {/* right image */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500&h=500&fit=crop" 
                alt="Spicy Chicken Wings"
                className="w-[450px] mx-auto rounded-3xl shadow-2xl"
              />
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -left-8 bottom-8 w-16 h-16 bg-red-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>
     </div>
    );
};

export default HeroSection;