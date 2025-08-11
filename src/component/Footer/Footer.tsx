import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-6 lg:mb-0">
            <h4 className="text-2xl font-bold text-[#000000] mb-2">
              Foodieland
            </h4>
            <p className="text-[#00000099] text-base">
              Lorem ipsum dolor sit amet, consectetuipisicing elit
            </p>
          </div>
          <div className="flex items-center space-x-8">
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
        <div className="flex flex-col lg:flex-row items-center justify-between text-center">
          <div className="text-[#00000099] w-full text-sm mb-4 lg:mb-0">
            © 2022 Flowbase. Powered by{" "}
            <span className="text-[#FF7967]">Webflow</span>
          </div>
          <div className="flex items-center justify-end text-right space-x-4">
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
