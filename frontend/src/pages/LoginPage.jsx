import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React from 'react';
import useAuthStore from '../store/useAuthStore';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {login,isLoggingin} = useAuthStore()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    login(formData)
    console.log('Login form submitted:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col lg:flex-row overflow-hidden relative">
      {/* Background blobs - now covering entire page */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 blur-3xl opacity-20 -top-20 -right-20 animate-blob"></div>
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 blur-3xl opacity-20 bottom-0 right-24 animate-blob animation-delay-2000"></div>
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-3xl opacity-20 top-1/2 -left-10 animate-blob animation-delay-4000"></div>
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 blur-3xl opacity-20 top-1/4 left-1/4 animate-blob animation-delay-3000"></div>
        <div className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 blur-3xl opacity-20 bottom-1/4 left-1/3 animate-blob animation-delay-5000"></div>
      </div>

      {/* Form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative z-10 py-12">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/5 transition-all duration-300 hover:shadow-2xl hover:border-white/10">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Sign in to continue to your account
            </p>
          </div>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>           
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 sm:py-3 bg-white/5 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500 transition-all duration-200 hover:bg-white/10"
                placeholder="name@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 sm:py-3 bg-white/5 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500 transition-all duration-200 hover:bg-white/10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors duration-200"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-2 sm:py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Log In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm sm:text-base">
              Don't have an account?{' '}
              <a 
                href="/signup" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Visual side */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4 z-10 py-12 lg:py-0">
        {/* App logo and tagline - now centered in its own container */}
        <div className="text-center max-w-md">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-2 sm:mb-4">
            blab
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">
            Connect instantly. Chat seamlessly.
          </p>
        </div>
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        .animate-blob {
          animation: blob 12s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-5000 {
          animation-delay: 5s;
        }
      `}</style>
    </div>
  );
}