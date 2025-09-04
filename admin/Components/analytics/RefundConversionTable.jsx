"use client";

import React from 'react';
import PaginatedTable from './PaginatedTable';

export default function RefundConversionTable({ events }) {
  const columns = [
    { header: 'Order ID', accessor: 'order_id' },
    { header: 'Product', accessor: 'product_name' },
    { header: 'Refund Amount', accessor: 'refund_amount', cell: (value) => value > 0 ? `ZMW ${value.toFixed(2)}` : '-' },
    { header: 'Conversion Event', accessor: 'event_type', cell: (value) => value.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') },
    { header: 'Date', accessor: 'event_date' },
  ];

  return <PaginatedTable title="Refund & Conversion Tracking" data={events} columns={columns} searchKey="order_id" />;
}