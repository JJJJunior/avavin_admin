"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "@/components/custom ui/Delete";
import Link from "next/link";
import { CollectionType } from "@/lib/types";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/dashboard/collections/${row.original.id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original.id} item={"collection"} />,
  },
];
