import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const CustomPieChart = ({ data }) => {
  const chartData = Object.keys(data).map((key) => {
    return { value: data[key], name: key };
  });

  return (
    <div>
      <PieChart width={500} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine="name"
          label
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
