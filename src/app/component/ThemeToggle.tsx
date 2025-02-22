"use client"
import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-900 rounded-full text-gray-600 dark:text-white"
    >
      {theme === 'dark' ? ' Light Mode 🌞' : ' Dark Mode 🌙'}
    </button>
  );
}
