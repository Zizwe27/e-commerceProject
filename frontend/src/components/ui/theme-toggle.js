"use client";

import React from 'react';
import { Button } from './button';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className={className}>
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system mode';
      case 'system':
        return 'Switch to light mode';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={className}
      title={getLabel()}
    >
      {getIcon()}
    </Button>
  );
};

export const ThemeSelect = ({ className = "" }) => {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label className="text-sm font-medium">Theme:</label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="px-2 py-1 text-sm border rounded bg-background text-foreground border-border"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
};