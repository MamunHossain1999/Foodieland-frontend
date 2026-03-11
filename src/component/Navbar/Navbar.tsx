import { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "@/Redux/api/authApi";

const baseMenuItems = [
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

  const { data: user, isLoading } = useGetProfileQuery();

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const handleClick = (href: string) => {
    setActive(href);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white sticky top-0  z-50 shadow-sm">
      <nav className="container mx-auto px-4 lg:px-0 py-6">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <h1 className="font-lobster text-2xl text-black">Foodieland</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-lg">
            {baseMenuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleClick(item.href)}
                className={`${
                  active === item.href
                    ? "text-blue-600 font-semibold"
                    : "text-black hover:text-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="https://facebook.com">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600" />
              </Link>

              <Link to="https://twitter.com">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400" />
              </Link>

              <Link to="https://instagram.com">
                <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600" />
              </Link>
            </div>

            {/* Auth Section */}
            {isLoading ? (
              <span className="text-sm">Loading...</span>
            ) : user ? (
              <div className="flex items-center gap-3">

                {/* Admin Button */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Admin
                  </Link>
                )}

                {/* Avatar */}
                <Link to="/profile">
                  <img
                    src={user?.avatar || "/assets/profile.jpg"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover hover:opacity-80"
                  />
                </Link>

              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {baseMenuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleClick(item.href)}
                className={`block py-2 border-b ${
                  active === item.href
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
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