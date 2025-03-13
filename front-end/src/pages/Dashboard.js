import React, { useState } from "react";
import DashboardLayout from "../components/Dashboardlayout";
import MyProducts from "../pages/MyProducts";
import SavedAddresses from "./saveaddress";
import WebsiteTraffic from "./TopProducts";
import MyOrders from "../pages/MyOrders";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Dashboard.css";

function Dashboard() {
  const [activeContent] = useState("Dashboard");

  const stats = [
    { label: "Total Products", value: 15, image: "/index-1.jpg" },
    { label: "Total Orders", value: 9, image: "/index-2.jpg" },
    { label: "Products Rented", value: 5, image: "/index-3.jpg" },
    { label: "Tasks Pending", value: 2, image: "/index-4.jpg" },
  ];

  const topProducts = [
    { name: "Construction Hammer", rentals: 25 },
    { name: "Electric Sander", rentals: 21 },
    { name: "Vacuum Cleaner", rentals: 18 },
    { name: "Air Compressor", rentals: 17 },
    { name: "Drill Machine", rentals: 16 },
  ];

  const chartData = [
    { time: "Mon", Sales: 10, Revenue: 5, Customers: 2 },
    { time: "Tue", Sales: 40, Revenue: 32, Customers: 11 },
    { time: "Wed", Sales: 30, Revenue: 20, Customers: 15 },
    { time: "Thu", Sales: 50, Revenue: 40, Customers: 25 },
    { time: "Fri", Sales: 70, Revenue: 60, Customers: 30 },
    { time: "Sat", Sales: 30, Revenue: 20, Customers: 15 },
    { time: "Sun", Sales: 50, Revenue: 40, Customers: 25 },
  ];

  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return (
          <div className="dashboard-page">
            <div className="dashboard-header">
              <h2>Dashboard</h2>
            </div>

            <div className="dashboard-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <img
                    src={stat.image}
                    alt={`${stat.label} Icon`}
                    className="stat-icon"
                  />
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="dashboard-body">
              <div className="sales-details">
                <h3>Sales Details</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Sales"
                      stroke="#007bff"
                      dot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Revenue"
                      stroke="#28a745"
                      dot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Customers"
                      stroke="#ff7300"
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="top-products">
              <WebsiteTraffic />
                <h3>Top 5 Rental Products</h3>
                <ul>
                  {topProducts.map((product, index) => (
                    <li key={index}>
                      {product.name}{" "}
                      <span className="rental-count">{product.rentals}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="My-orders">
                <h3>My Orders</h3>
                <img src='/index-2.jpg' alt='My Orders' className="My-orders-icon" />
                <div className="My-orders-count">15</div>
              </div>

              <div className="total-sales">
                <h3>Total Sales</h3>
                <div className="total-sales-amount">$9000</div>
              </div>
            </div>
          </div>
        );
      case "My Products":
        return (
          <div className="my-products-page">
            <MyProducts />
          </div>
        );
      case "SavedAddress":
        return (
          <div className="saved-address-page">
            <SavedAddresses />
          </div>
        );
      case "My Orders":
        return (
          <div className="my-orders-page">
            <MyOrders />
          </div>
        );
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return <DashboardLayout>{renderContent()}</DashboardLayout>;
}

export default Dashboard;
