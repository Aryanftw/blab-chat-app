import { Settings, LogOut, User, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close mobile menu when navigating to a different page
  useEffect(() => {
    return () => setIsMenuOpen(false);
  }, [navigate]);

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsMenuOpen(false);
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      // Error will be shown by the store's toast
      console.error("Component caught logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!authUser) return null;

  return (
    <nav className="bg-black text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - App name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              blab
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Profile */}
            <Link 
              to="/profile" 
              className="group flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
            >
              <User className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                Profile
              </span>
            </Link>

            {/* Settings */}
            <Link 
              to="/settings" 
              className="group flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
            >
              <Settings className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                Settings
              </span>
            </Link>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`group flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                isLoggingOut 
                  ? "bg-gray-700 cursor-wait" 
                  : "hover:bg-gray-800"
              }`}
            >
              <LogOut className={`h-5 w-5 transition-colors duration-300 ${
                isLoggingOut ? "text-gray-400" : "text-gray-300 group-hover:text-white"
              }`} />
              <span className={`text-sm transition-colors duration-300 ${
                isLoggingOut ? "text-gray-400" : "text-gray-300 group-hover:text-white"
              }`}>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${
          isMenuOpen ? "transform translate-y-0 opacity-100" : "transform -translate-y-full opacity-0 pointer-events-none"
        } md:hidden absolute top-16 inset-x-0 transition-all duration-300 ease-in-out bg-black border-t border-gray-800 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Mobile Profile Link */}
          <Link
            to="/profile"
            className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>

          {/* Mobile Settings Link */}
          <Link
            to="/settings"
            className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>

          {/* Mobile Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-base font-medium text-white rounded-md transition-colors duration-200 ${
              isLoggingOut ? "bg-gray-700 cursor-wait" : "hover:bg-gray-800"
            }`}
          >
            <LogOut className="h-5 w-5" />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}