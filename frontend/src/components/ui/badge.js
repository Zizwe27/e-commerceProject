import React from 'react'

const Badge = ({ className, children, ...props }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className || ''}`}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge } 