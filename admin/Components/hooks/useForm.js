"use client";

import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validate = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return null;
  }, [validationRules, values]);

  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validate(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validate, validationRules]);

  // Handle input change
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  // Handle input blur
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validate(name, values[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [values, validate]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    const isValid = validateAll();
    
    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validateAll, validationRules]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set field value programmatically
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  // Set field error programmatically
  const setError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValue,
    setError,
    validate,
    validateAll,
    isValid: Object.keys(errors).length === 0 || Object.values(errors).every(error => !error)
  };
};

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required') => (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return message;
    }
    return null;
  },

  email: (message = 'Please enter a valid email address') => (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return message;
    }
    return null;
  },

  minLength: (min, message) => (value) => {
    if (value && value.length < min) {
      return message || `Must be at least ${min} characters long`;
    }
    return null;
  },

  maxLength: (max, message) => (value) => {
    if (value && value.length > max) {
      return message || `Must be no more than ${max} characters long`;
    }
    return null;
  },

  min: (min, message) => (value) => {
    if (value && Number(value) < min) {
      return message || `Must be at least ${min}`;
    }
    return null;
  },

  max: (max, message) => (value) => {
    if (value && Number(value) > max) {
      return message || `Must be no more than ${max}`;
    }
    return null;
  },

  pattern: (regex, message) => (value) => {
    if (value && !regex.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },

  confirmPassword: (passwordField, message = 'Passwords do not match') => (value, allValues) => {
    if (value && value !== allValues[passwordField]) {
      return message;
    }
    return null;
  }
};