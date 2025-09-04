"use client";

import { useState, useEffect, useCallback } from 'react';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Custom hook for API calls
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};

// Hook for GET requests
export const useFetch = (endpoint, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for POST/PUT/DELETE requests
export const useMutation = (endpoint, method = 'POST') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useCallback(async (body) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, method]);

  return { mutate, loading, error, data };
};

// Hook for paginated data
export const usePaginatedFetch = (endpoint, page = 1, limit = 10) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE_URL}${endpoint}?page=${page}&limit=${limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data || result);
      setTotal(result.total || result.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { 
    data, 
    total, 
    loading, 
    error, 
    refetch: fetchData,
    hasNextPage: page * limit < total,
    hasPreviousPage: page > 1
  };
};