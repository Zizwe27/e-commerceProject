"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function PaginatedTable({ title, data, columns, searchKey, itemsPerPage = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    item[searchKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder={`Search ${searchKey}s...`}
            className="pl-10 w-full md:w-48 bg-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                {columns.map(col => <TableHead key={col.accessor}>{col.header}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50/60">
                  {columns.map(col => (
                    <TableCell key={col.accessor} className="py-3">
                      {col.cell ? col.cell(item[col.accessor]) : item[col.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-4 pt-4 mt-auto">
        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}