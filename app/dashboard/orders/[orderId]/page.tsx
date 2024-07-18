import React from 'react';
import axios from "axios";
import ShowTable from "@/components/custom ui/ShowTable";

interface OrderDetailProps {
  params: {
    orderId: string;
  }
}

const OrderDetail: React.FC<OrderDetailProps> = async ({params}) => {

  //服务端获取数据要填写完整的地址
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${params.orderId}`);

  const orderDetail = res.data;

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetail.customerClerkId}</span>
      </p>
      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{orderDetail.customer.name}</span>
      </p>
      <p className="text-base-bold">
        Shipping address: <span
        className="text-base-medium">
        {orderDetail.shippingAddress.streetNumber},
        {orderDetail.shippingAddress.streetName},
        {orderDetail.shippingAddress.city},
        {orderDetail.shippingAddress.state},
        {orderDetail.shippingAddress.postalCode},
        {orderDetail.shippingAddress.country},
      </span>
      </p>
      <p className="text-base-bold">
        Total Paid: <span className="text-base-medium">${orderDetail.totalAmount}</span>
      </p>
      <p className="text-base-bold">
        Shipping rate ID: <span className="text-base-medium">{orderDetail.shippingRate}</span>
      </p>
      {/*<DataTable columns={columns} data={orderDetail.products}/>*/}
      <ShowTable invoices={orderDetail.products}/>
    </div>
  );
};

export default OrderDetail;