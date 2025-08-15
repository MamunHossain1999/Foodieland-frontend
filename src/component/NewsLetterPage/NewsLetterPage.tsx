import leftside from "@/assets/newsLetterImg/leftsite.png";
import rightside from "@/assets/newsLetterImg/rightsite.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsLetterPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <div className="w-full mx-auto px-4 sm:px-8 md:px-16">
      <div
        className="rounded-3xl bg-[#E7F9FD] relative overflow-hidden container mx-auto py-12 sm:py-16 md:py-20"
        data-aos="fade-up"
      >
        {/* Background Images */}
        <img
          src={leftside}
          alt="Left Side"
          className="absolute w-[180px] sm:w-[250px] md:w-[300px] lg:w-[350px] left-0 bottom-0 z-10 -translate-x-1/4 translate-y-1/4 sm:-translate-x-1/3 sm:translate-y-1/3"
          data-aos="fade-right"
        />
        <img
          src={rightside}
          alt="Right Side"
          className="absolute w-[180px] sm:w-[250px] md:w-[300px] lg:w-[350px] right-0 bottom-0 z-10 translate-x-1/4 translate-y-1/4 sm:translate-x-1/3 sm:translate-y-1/3"
          data-aos="fade-left"
        />

        {/* Content */}
        <div className="w-full text-center z-10 flex flex-col items-center justify-center h-full px-4 relative">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 max-w-xl"
            data-aos="zoom-in"
          >
            Deliciousness to your inbox
          </h3>
          <p
            className="text-black/60 mb-8 text-base max-w-md sm:max-w-lg mx-auto z-20 px-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <form
            className="flex flex-col sm:flex-row max-w-md w-full mx-auto rounded-full overflow-hidden shadow-md"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Subscribe to newsletter"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <input
              type="email"
              placeholder="Your email address..."
              className="flex-1 px-6 py-3 rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none z-20 focus:ring-2 focus:ring-blue-400 bg-white mb-3 sm:mb-0"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-full sm:rounded-r-full sm:rounded-l-none z-20 font-medium hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterPage;
