"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from './button';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const Toast = ({ id, title, description, variant = "default", onClose }) => {
  const variants = {
    default: "bg-white border-gray-200",
    destructive: "bg-red-50 border-red-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200"
  };

  const icons = {
    default: <Info className="h-4 w-4" />,
    destructive: <AlertCircle className="h-4 w-4 text-red-600" />,
    success: <CheckCircle className="h-4 w-4 text-green-600" />,
    warning: <AlertTriangle className="h-4 w-4 text-yellow-600" />
  };

  return (
    <div className={`border rounded-lg p-4 shadow-lg max-w-sm w-full ${variants[variant]}`}>
      <div className="flex items-start space-x-3">
        {icons[variant]}
        <div className="flex-1">
          {title && <div className="font-medium text-sm">{title}</div>}
          {description && <div className="text-sm text-gray-600 mt-1">{description}</div>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onClose(id)}
          className="h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};