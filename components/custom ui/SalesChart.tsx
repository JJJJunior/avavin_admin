"use client"
import React from 'react';
import {LineChart, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis, Tooltip} from "recharts";

const SalesChart = ({data}: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} className="w-full h-full" margin={{top: 5, right: 20, bottom: 5, left: 0}}>
        <Line type="monotone" dataKey="sales" stroke="#8884d8"/>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;