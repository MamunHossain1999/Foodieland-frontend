import { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";


const menuItems = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "About us", href: "/about" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    // route change hole active update
    setActive(location.pathname);
  }, [location]);

  const handleClick = (href: string) => {
    setActive(href);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4  lg:px-0 py-8">
        <div className="flex items-center justify-between">
          <h1 className="font-lobster text-2xl text-[#000000]">Foodieland</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-xl">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleClick(item.href)}
                className={`cursor-pointer ${
                  active === item.href
                    ? "text-blue-600 font-semibold"
                    : "text-[#000000] hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleClick(item.href)}
                className={`block py-2 border-b border-gray-200 ${
                  active === item.href
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
