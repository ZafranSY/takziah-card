"use client"
import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
