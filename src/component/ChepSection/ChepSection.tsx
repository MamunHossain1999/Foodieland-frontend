import img from "@/assets/chepsectionImg/portrait-happy-male-chef-dressed-uniform 1 (6).svg";
const ChepSection = () => {
  return (
    <div className="container mx-auto py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center border">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Everyone can be a chef in their own kitchen
            </h3>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
              Learn More
            </button>
          </div>
          <div className="lg:w-1/2">
            <img
              src={img}
              alt="Chef cooking"
              className="w-[600px] h-[560px] mx-auto rounded-3xl relative z"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChepSection;
