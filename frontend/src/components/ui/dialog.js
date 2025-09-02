"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg mx-4">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ className, children, ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

const DialogHeader = ({ className, children, ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

const DialogTitle = ({ className, children, ...props }) => {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className || ''}`} {...props}>
      {children}
    </h2>
  );
};

const DialogDescription = ({ className, children, ...props }) => {
  return (
    <p className={`text-sm text-gray-600 ${className || ''}`} {...props}>
      {children}
    </p>
  );
};

const DialogFooter = ({ className, children, ...props }) => {
  return (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

const DialogClose = ({ className, children, ...props }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`absolute right-4 top-4 ${className || ''}`}
      {...props}
    >
      <X className="h-4 w-4" />
      {children}
    </Button>
  );
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose };