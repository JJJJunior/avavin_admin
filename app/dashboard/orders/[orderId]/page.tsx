import React from 'react';
import axios from "axios";

interface OrderDetailProps {
  params: {
    orderId: string;
  }
}

const OrderDetail: React.FC<OrderDetailProps> = async ({params}) => {

  //服务端获取数据要填写完整的地址
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${params.orderId}`);

  const orderDetail = await res.data;

  console.log(orderDetail)

  return (
    <div>
      OrderDetail
    </div>
  );
};

export default OrderDetail;