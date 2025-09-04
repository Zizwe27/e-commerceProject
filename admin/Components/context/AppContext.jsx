"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Initial state
const initialState = {
  user: null,
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
  loading: false,
  error: null,
  settings: {
    language: 'en',
    currency: 'USD',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    itemsPerPage: 10
  }
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_THEME: 'SET_THEME',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SIDEBAR_OPEN: 'SET_SIDEBAR_OPEN',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  RESET_STATE: 'RESET_STATE'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    
    case ActionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    
    case ActionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    case ActionTypes.SET_SIDEBAR_OPEN:
      return { ...state, sidebarOpen: action.payload };
    
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }]
      };
    
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    
    case ActionTypes.RESET_STATE:
      return initialState;
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('app-settings');
      const savedTheme = localStorage.getItem('app-theme');
      
      if (savedSettings) {
        dispatch({ type: ActionTypes.UPDATE_SETTINGS, payload: JSON.parse(savedSettings) });
      }
      if (savedTheme) {
        dispatch({ type: ActionTypes.SET_THEME, payload: savedTheme });
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('app-settings', JSON.stringify(state.settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }, [state.settings]);

  useEffect(() => {
    try {
      localStorage.setItem('app-theme', state.theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [state.theme]);

  // Actions
  const actions = {
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    
    setTheme: (theme) => dispatch({ type: ActionTypes.SET_THEME, payload: theme }),
    
    toggleSidebar: () => dispatch({ type: ActionTypes.TOGGLE_SIDEBAR }),
    
    setSidebarOpen: (open) => dispatch({ type: ActionTypes.SET_SIDEBAR_OPEN, payload: open }),
    
    addNotification: (notification) => dispatch({ 
      type: ActionTypes.ADD_NOTIFICATION, 
      payload: notification 
    }),
    
    removeNotification: (id) => dispatch({ 
      type: ActionTypes.REMOVE_NOTIFICATION, 
      payload: id 
    }),
    
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    
    updateSettings: (settings) => dispatch({ 
      type: ActionTypes.UPDATE_SETTINGS, 
      payload: settings 
    }),
    
    resetState: () => dispatch({ type: ActionTypes.RESET_STATE })
  };

  // Helper functions
  const showNotification = (message, type = 'info', duration = 5000) => {
    const notification = { message, type, duration };
    actions.addNotification(notification);
    
    if (duration > 0) {
      setTimeout(() => {
        actions.removeNotification(notification.id);
      }, duration);
    }
  };

  const showSuccess = (message) => showNotification(message, 'success');
  const showError = (message) => showNotification(message, 'error');
  const showWarning = (message) => showNotification(message, 'warning');
  const showInfo = (message) => showNotification(message, 'info');

  const value = {
    ...state,
    ...actions,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};