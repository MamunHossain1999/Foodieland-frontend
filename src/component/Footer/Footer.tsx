import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto p-4 md:p-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between text-center lg:text-left">
          <div className="mb-6 lg:mb-0 max-w-lg mx-auto lg:mx-0">
            <h4 className="text-2xl font-bold text-[#000000] mb-2">
              Foodieland
            </h4>
            <p className="text-[#00000099] text-base">
              Lorem ipsum dolor sit amet, consectetuipisicing elit
            </p>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 max-w-lg mx-auto lg:mx-0">
            <Link to="/recipes" className="text-[#000000] hover:text-gray-900">
              Recipes
            </Link>
            <Link to="/blog" className="text-[#000000] hover:text-gray-900">
              Blog
            </Link>
            <Link to="/contact" className="text-[#000000] hover:text-gray-900">
              Contact
            </Link>
            <Link to="/about" className="text-[#000000] hover:text-gray-900">
              About us
            </Link>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-4">
          <div className="text-[#00000099] w-full lg:w-auto mx-auto text-sm">
            © 2022 Flowbase. Powered by{" "}
            <span className="text-[#FF7967]">Webflow</span>
          </div>
          <div className="flex items-center justify-center lg:justify-end space-x-4">
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600" />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-400" />
            </a>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-gray-600 cursor-pointer hover:text-pink-600" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
