"use client"
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/custom ui/DataTable";
import {columns} from "@/components/orders/OrderColumns"
import Loader from "@/components/custom ui/Loader"

const OrdersPage = () => {

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get(`/api/orders`)
      if (res.status === 200) {
        setOrders(res.data)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return loading ? (<Loader/>) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5"/>
      <DataTable columns={columns} data={orders} searchKey="id"/>
    </div>
  );
};

export default OrdersPage;