import React, { createContext, useContext, useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';
// Available themes with distinct colors
export const themeOptions = [
  { id: 'default', name: 'Default', bgColor: 'bg-black', textColor: 'text-white' },
  { id: 'coffee', name: 'Coffee', bgColor: 'bg-amber-900', textColor: 'text-amber-50' },
  { id: 'night', name: 'Night', bgColor: 'bg-slate-900', textColor: 'text-slate-50' },
  { id: 'ocean', name: 'Ocean', bgColor: 'bg-blue-800', textColor: 'text-blue-50' },
  { id: 'forest', name: 'Forest', bgColor: 'bg-emerald-800', textColor: 'text-emerald-50' },
  { id: 'sunset', name: 'Sunset', bgColor: 'bg-orange-600', textColor: 'text-orange-50' },
  { id: 'lavender', name: 'Lavender', bgColor: 'bg-purple-700', textColor: 'text-purple-50' },
  { id: 'ruby', name: 'Ruby', bgColor: 'bg-red-700', textColor: 'text-red-50' },
  { id: 'mint', name: 'Mint', bgColor: 'bg-green-600', textColor: 'text-green-50' },
];

// Theme context for component access
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const { theme, setTheme } = useThemeStore();
  
  // Apply theme to document when it changes
  useEffect(() => {
    const selectedTheme = themeOptions.find(t => t.id === theme) || themeOptions[0];
    
    // Remove any existing theme classes
    document.body.classList.remove(
      ...themeOptions.flatMap(t => [t.bgColor, t.textColor])
    );
    
    // Add new theme classes
    document.body.classList.add(selectedTheme.bgColor, selectedTheme.textColor);
    
    // You can also set CSS variables for more granular styling
    document.documentElement.style.setProperty('--theme-bg-color', getComputedStyle(document.body).backgroundColor);
    document.documentElement.style.setProperty('--theme-text-color', getComputedStyle(document.body).color);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ 
      currentTheme: theme, 
      setTheme, 
      themeOptions,
      getCurrentThemeColors: () => themeOptions.find(t => t.id === theme) || themeOptions[0]
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;