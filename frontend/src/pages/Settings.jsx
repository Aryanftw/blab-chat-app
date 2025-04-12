import React, { useState } from 'react';
import { Settings, Check, Eye } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

const ThemeSettingsPage = () => {
  const { currentTheme, setTheme, themeOptions, getCurrentThemeColors } = useTheme();
  const [previewTheme, setPreviewTheme] = useState(currentTheme);
  
  const handleThemeChange = (newTheme) => {
    setPreviewTheme(newTheme);
  };

  const applyTheme = () => {
    setTheme(previewTheme);
  };

  // Get current preview theme colors
  const previewThemeColors = themeOptions.find(t => t.id === previewTheme) || themeOptions[0];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Theme Settings</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Theme Selection Panel */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Theme</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {themeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleThemeChange(option.id)}
                  className={`p-4 rounded-lg ${option.bgColor} ${option.textColor} flex items-center justify-between transition-all hover:scale-105 ${
                    previewTheme === option.id ? 'ring-4 ring-blue-500' : ''
                  }`}
                >
                  <span className="font-medium">{option.name}</span>
                  {previewTheme === option.id && <Check size={18} />}
                </button>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={applyTheme}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Apply Theme
              </button>
            </div>
          </div>
          
          {/* Preview Panel */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-4">
              <div className="flex items-center mb-4">
                <Eye size={20} className="mr-2 text-gray-700 dark:text-gray-300" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Preview</h2>
              </div>
              
              <div className={`rounded-lg ${previewThemeColors.bgColor} ${previewThemeColors.textColor} p-6 shadow-inner`}>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Preview: {previewThemeColors.name}</h3>
                  <p>This is how your website will look with the {previewThemeColors.name.toLowerCase()} theme.</p>
                  
                  {/* Example content */}
                  <div className="space-y-3 mt-6">
                    <div className="p-3 rounded bg-opacity-20 bg-black">
                      <p className="font-medium">User :</p>
                      <p>How do I change my theme settings?</p>
                    </div>
                    
                    <div className="p-3 rounded bg-opacity-10 bg-black">
                      <p className="font-medium">Support : </p>
                      <p>You can select from any of the available themes in the settings panel on the left!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Theme Information */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Currently Applied</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full ${getCurrentThemeColors().bgColor}`}></div>
                <span className="text-gray-700 dark:text-gray-300">{getCurrentThemeColors().name}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                This theme is currently applied across all pages of your application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettingsPage;