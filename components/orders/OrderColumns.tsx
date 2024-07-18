"use client";
import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import Link from "next/link";
import {OrderType} from "@/lib/types";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({row}) => (
      <Link href={`/dashboard/orders/${row.original.id}`} className="hover:text-red-1">
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({row}) => (row.original.customer.name)
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({row}) => (
      row.original.products.length
    )
  },
  {
    accessorKey: "totalAmount",
    header: "Total ($)",
    cell: ({row}) => (
      (row.original.totalAmount).toFixed(2)
    )
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
