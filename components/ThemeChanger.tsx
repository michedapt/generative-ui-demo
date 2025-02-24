'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor, Leaf, Waves } from 'lucide-react';

interface Theme {
  name: string;
  value: string;
}

interface ThemeChangerProps {
  themes: Theme[];
}

export function ThemeChanger({ themes }: ThemeChangerProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getIcon = (value: string) => {
    switch (value) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
      case 'forest':
        return <Leaf className="w-4 h-4" />;
      case 'ocean':
        return <Waves className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getButtonClass = (value: string) => {
    const baseClass = "px-4 py-2 rounded-md flex items-center gap-2 transition-colors";
    const isSelected = theme === value;

    switch (value) {
      case 'light':
        return `${baseClass} ${isSelected 
          ? 'bg-blue-100 text-blue-900 ring-2 ring-blue-400' 
          : 'bg-blue-50 text-blue-800 hover:bg-blue-100'}`;
      case 'dark':
        return `${baseClass} ${isSelected 
          ? 'bg-gray-800 text-gray-100 ring-2 ring-gray-500' 
          : 'bg-gray-700 text-gray-200 hover:bg-gray-800'}`;
      case 'system':
        return `${baseClass} ${isSelected 
          ? 'bg-purple-100 text-purple-900 ring-2 ring-purple-400' 
          : 'bg-purple-50 text-purple-800 hover:bg-purple-100'}`;
      case 'forest':
        return `${baseClass} ${isSelected 
          ? 'bg-green-100 text-green-900 ring-2 ring-green-400' 
          : 'bg-green-50 text-green-800 hover:bg-green-100'}`;
      case 'ocean':
        return `${baseClass} ${isSelected 
          ? 'bg-cyan-100 text-cyan-900 ring-2 ring-cyan-400' 
          : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100'}`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {themes.map((themeOption) => (
        <button
          key={themeOption.name}
          onClick={() => setTheme(themeOption.value)}
          className={getButtonClass(themeOption.value)}
        >
          {getIcon(themeOption.value)}
          {themeOption.name}
        </button>
      ))}
    </div>
  );
}