import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/Dashboard.css";

const WebsiteTraffic = () => {
  const data = [
    { name: "Construction Hammer", value: 25, color: "#007bff" },
    { name: "Electric Sander", value: 21, color: "#28a745" },
    { name: "Vacuum Cleaner", value: 18, color: "#ffc107" },
    { name: "Air Compressor", value: 17, color: "#ff5733" },
    { name: "Drill Machine", value: 16, color: "#17a2b8" },
  ];

  return (
    <div className="traffic-chart">
      <h3>Website Traffic | <span className="sub-header">This Month</span></h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WebsiteTraffic;
