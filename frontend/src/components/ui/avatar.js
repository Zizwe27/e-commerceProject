import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ src, alt, fallback, size = "md", className = "", ...props }) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg"
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-gray-100 ${sizes[size]} ${className}`} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size]} rounded-full object-cover`}
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-gray-200 flex items-center justify-center`}>
          {fallback ? (
            <span className={`font-medium text-gray-600 ${textSizes[size]}`}>
              {fallback}
            </span>
          ) : (
            <User className={`text-gray-400 ${size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'}`} />
          )}
        </div>
      )}
    </div>
  );
};

const AvatarGroup = ({ children, max = 3, className = "" }) => {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {visibleChildren.map((child, index) => (
        <div key={index} className="ring-2 ring-white rounded-full">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="ring-2 ring-white rounded-full bg-gray-100 h-10 w-10 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-600">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup };