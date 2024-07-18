import React from 'react';
import prisma from '@/prisma'
import {Separator} from "@/components/ui/separator";
import {columns} from "@/components/customers/CustomersColumns";
import {DataTable} from "@/components/custom ui/DataTable";

const CustomersPage = async () => {

  const customers = await prisma.customer.findMany()

  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Customers</p>
      <Separator className="my-5 bg-grey-1"/>
      <DataTable columns={columns} data={customers} searchKey="name"/>
    </div>
  );
};

export default CustomersPage;