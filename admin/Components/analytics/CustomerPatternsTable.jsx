"use client";

import React from 'react';
import PaginatedTable from './PaginatedTable';

export default function CustomerPatternsTable({ customers }) {
  const columns = [
    { header: 'Customer Name', accessor: 'name' },
    { header: 'Total Orders', accessor: 'totalOrders' },
    { header: 'Total Spent', accessor: 'totalSpent', cell: (value) => `ZMW ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { header: 'Last Order Date', accessor: 'lastOrderDate' }
  ];

  return <PaginatedTable title="Customer Purchase Patterns" data={customers} columns={columns} searchKey="name" />;
}