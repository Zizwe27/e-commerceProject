import React from 'react';

const Alert = ({ className, variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-blue-50 text-blue-900 border-blue-200",
    destructive: "bg-red-50 text-red-900 border-red-200",
    warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
    success: "bg-green-50 text-green-900 border-green-200"
  };

  return (
    <div
      className={`rounded-lg border p-4 ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertTitle = ({ className, children, ...props }) => {
  return (
    <h5 className={`mb-1 font-medium leading-none tracking-tight ${className || ''}`} {...props}>
      {children}
    </h5>
  );
};

const AlertDescription = ({ className, children, ...props }) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export { Alert, AlertTitle, AlertDescription };