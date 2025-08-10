import { useState } from "react";
import { Facebook, Instagram, Twitter, Menu, X } from "lucide-react";

const menuItems = [
  { label: "Home", href: "#" },
  { label: "Recipes", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
  { label: "About us", href: "#" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const handleClick = (label:string) => {
    setActive(label);
    setIsOpen(false); // mobile menu bondo hobe click korle
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Foodieland</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleClick(item.label)}
                className={`cursor-pointer ${
                  active === item.label
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Facebook className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600" />
            <Twitter className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-400" />
            <Instagram className="w-5 h-5 text-gray-600 cursor-pointer hover:text-pink-600" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <Facebook className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600" />
              <Twitter className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-400" />
              <Instagram className="w-5 h-5 text-gray-600 cursor-pointer hover:text-pink-600" />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleClick(item.label)}
                className={`block py-2 border-b border-gray-200 cursor-pointer ${
                  active === item.label
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
