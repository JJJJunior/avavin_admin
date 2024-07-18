"use client";
import {ColumnDef} from "@tanstack/react-table";
import {CustomerType} from "@/lib/types";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "id",
    header: "Clerk ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
