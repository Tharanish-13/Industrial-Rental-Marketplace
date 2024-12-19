import React, { useState } from 'react';
import DashboardLayout from '../components/Dashboardlayout';
import MyProducts from '../pages/MyProducts';
import SavedAddresses from './saveaddress';
import MyOrders from '../pages/MyOrders';
import '../styles/Dashboard.css';

function Dashboard() {
  // State to manage which content to show
  const [activeContent] = useState("Dashboard");

  // Dummy data for Dashboard stats
  const stats = [
    { label: "Total Products", value: 15 },
    { label: "Total Orders", value: 9 },
    { label: "Products Rented", value: 5 },
    { label: "Tasks Pending", value: 2 }
  ];

  const salesData = [
    { day: "Mon", sales: 20 },
    { day: "Tue", sales: 40 },
    { day: "Wed", sales: 30 },
    { day: "Thu", sales: 50 },
    { day: "Fri", sales: 45 },
    { day: "Sat", sales: 60 },
    { day: "Sun", sales: 55 },
  ];

  const topProducts = [
    { name: "Construction Hammer", rentals: 25 },
    { name: "Electric Sander", rentals: 21 },
    { name: "Vacuum Cleaner", rentals: 18 },
    { name: "Air Compressor", rentals: 17 },
    { name: "Drill Machine", rentals: 16 }
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
      <span className="stat-label">{stat.label}</span>
      <span className="stat-value">{stat.value}</span>
    </div>
  ))}
</div>

            <div className="dashboard-body">
              <div className="sales-details">
                <h3>Sales Details</h3>
                <div className="sales-graph">
                  {salesData.map((data, index) => (
                    <div key={index} className="graph-bar" style={{ height: `${data.sales}px` }}>
                      <span>{data.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="top-products">
                <h3>Top 5 Rental Products</h3>
                <ul>
                  {topProducts.map((product, index) => (
                    <li key={index}>
                      {product.name} <span className="rental-count">{product.rentals}</span>
                    </li>
                  ))}
                </ul>
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

  return (
    <DashboardLayout>
      {renderContent()}
    </DashboardLayout>
  );
}

export default Dashboard;
