import { Settings, LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
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

  if (!authUser) return null;

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - App name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              blab
            </Link>
          </div>

          {/* Right side - Navigation items */}
          <div className="flex items-center space-x-6">
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
    </nav>
  );
}