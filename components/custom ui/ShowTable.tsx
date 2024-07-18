import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Link from "next/link";

interface ShowTableProps {
  invoices: any[]
}

const ShowTable: React.FC<ShowTableProps> = ({invoices}) => {
  console.log(invoices)
  return (
    <div className="my-4 p-2 border rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[600px]">Product</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Link
                  className="hover:text-red-1"
                  href={`/dashboard/products/${item.productId}`}>{item.title}</Link>
              </TableCell>
              <TableCell>{item.color}</TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{(item.amountTotal / 100).toFixed(2)} ({item.currency})</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShowTable;