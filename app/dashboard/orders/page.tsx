import React from 'react';
import axios from "axios";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/custom ui/DataTable";
import {columns} from "@/components/orders/OrderColumns"

const OrdersPage = async () => {
    const res = await axios.get('http://localhost:3000/api/orders')
    const orders = res.data
    return (
        <div className="px-10 py-5">
            <p className="text-heading2-bold">Orders</p>
            <Separator className="bg-grey-1 my-5"/>
            <DataTable columns={columns} data={orders} searchKey="id"/>
        </div>
    );
};

export default OrdersPage;