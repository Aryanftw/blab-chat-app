import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, X } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const openImageModal = () => {
    if (authUser?.profilePic || selectedImg) {
      setIsImageOpen(true);
    }
  };

  const closeImageModal = () => {
    setIsImageOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-10">
      {/* Image Modal */}
      {isImageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button
              onClick={closeImageModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImg || authUser.profilePic}
              alt="Profile"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          <div className="px-6 py-8 md:px-10">
            {/* Profile Header with Avatar */}
            <div className="flex flex-col items-center -mt-20 mb-8">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    onClick={openImageModal}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-1 right-1 
                      bg-white dark:bg-gray-800 shadow-lg
                      p-2.5 rounded-full cursor-pointer 
                      border-2 border-gray-200 dark:border-gray-700
                      hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-700
                      transition-all duration-200 ease-in-out
                    `}
                  >
                    <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{authUser?.fullName}</h1>
              <p className="text-gray-500 dark:text-gray-400">{authUser?.email}</p>
              
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700">
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div className="group">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1.5">
                      <User className="w-4 h-4" />
                      Full Name
                    </div>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors duration-200">
                      <p className="font-medium text-gray-800 dark:text-gray-200">{authUser?.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1.5">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </div>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors duration-200">
                      <p className="font-medium text-gray-800 dark:text-gray-200">{authUser?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Account Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700">
                  Account Information
                </h2>
                
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">Member Since</span>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">
                        {authUser.createdAt?.split("T")[0]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-5 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">Account Status</span>
                      </div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-medium rounded-md">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-medium">Need help?</span> Contact support for assistance with your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;