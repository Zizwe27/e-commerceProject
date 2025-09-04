"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';

const statusStyles = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  low_stock: "bg-amber-50 text-amber-700 border-amber-200",
  out_of_stock: "bg-red-50 text-red-700 border-red-200",
  inactive: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function ProductTable({ products, onDelete }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 overflow-hidden">
      <CardHeader>
        <CardTitle>Product Listings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50/60 transition-colors">
                  <TableCell>
                    <img 
                      src={product.image_url || 'https://placehold.co/40x40/E2E8F0/A0AEC0?text=P'} 
                      alt={product.name} 
                      className="h-10 w-10 rounded-md object-cover" 
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-gray-500">{product.sku}</TableCell>
                  <TableCell>
                    {product.stock_quantity}{' '}
                    {product.status === 'low_stock' && (
                      <span className="text-amber-600">Low</span>
                    )}
                  </TableCell>
                  <TableCell>ZMW {product.price?.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusStyles[product.status]}`}>
                      {product.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/products/edit/${product.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(product.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
