import React from 'react'

const Table = ({ className, ...props }) => {
  return (
    <div className={`relative w-full overflow-auto ${className || ''}`}>
      <table className="w-full caption-bottom text-sm" {...props} />
    </div>
  )
}

const TableHeader = ({ className, ...props }) => {
  return <thead className={`[&_tr]:border-b ${className || ''}`} {...props} />
}

const TableBody = ({ className, ...props }) => {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className || ''}`} {...props} />
  )
}

const TableRow = ({ className, ...props }) => {
  return (
    <tr
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className || ''}`}
      {...props}
    />
  )
}

const TableHead = ({ className, ...props }) => {
  return (
    <th
      className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className || ''}`}
      {...props}
    />
  )
}

const TableCell = ({ className, ...props }) => {
  return (
    <td
      className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className || ''}`}
      {...props}
    />
  )
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } 