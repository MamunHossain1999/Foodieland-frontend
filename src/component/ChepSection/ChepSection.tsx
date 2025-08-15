import img from "@/assets/chepsectionImg/portrait-happy-male-chef-dressed-uniform 1 (6).svg";

const ChepSection = () => {
  return (
    <div className="container mx-auto py-24">
      <div className="flex flex-col lg:flex-row items-center">
        <div
          className="lg:w-1/2 mb-8 px-4 lg:mb-0"
          data-aos="fade-right" // animation here
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Everyone can be a chef in their own kitchen
          </h3>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
            Learn More
          </button>
        </div>
        <div className="lg:w-1/2" data-aos="fade-left">
          <img
            src={img}
            alt="Chef cooking"
            className="max-w-full h-auto mx-auto rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ChepSection;
