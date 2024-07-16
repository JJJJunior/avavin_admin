"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "@/components/custom ui/Delete";
import Link from "next/link";
import { ProductType } from "@/lib/types";
import prisma from "@/prisma";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/dashboard/products/${row.original.id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collectios",
    cell: ({ row }) => row.original.collections.map((collection) => <p>{collection.collection.title}</p>),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original.id} />,
  },
];
