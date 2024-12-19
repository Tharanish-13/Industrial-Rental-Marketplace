import React, { useState } from 'react';
import DashboardLayout from '../components/Dashboardlayout';
import '../styles/Orderstatus.css';

const OrderDetails = ({ order, onClose }) => {
  const handleAction = (newStatus) => {
    order.status = newStatus; // Update status dynamically
  };

  const renderButtonsByStatus = () => {
    switch (order.status) {
      case 'Requested':
        return (
          <>
            <button className="accept" onClick={() => handleAction('Payment Pending')}>
              Accept
            </button>
            <button className="reject" onClick={() => handleAction('Rejected')}>
              Reject
            </button>
          </>
        );
      case 'Payment Pending':
        return (
          <button className="accept" onClick={() => handleAction('Waiting to Ship')}>
            Paid
          </button>
        );
      case 'Waiting to Ship':
        return (
          <button className="accept" onClick={() => handleAction('Shipped')}>
            Ship
          </button>
        );
      case 'Shipped':
        return (
          <button className="accept" onClick={() => handleAction('Delivered')}>
            Deliver
          </button>
        );
      case 'Delivered':
        return (
          <button className="accept" onClick={() => handleAction('Returned')}>
            Return
          </button>
        );
      case 'Rejected':
        return <p className="info">Order has been rejected.</p>;
      default:
        return <p className="info">Order completed.</p>;
    }
  };

  return (
    <div className="order-modal-overlay">
      <div className="order-container">
        {/* Header */}
        <div className="order-header">
          <h1>
            Order ID: <span>#{order.orderId}</span>
          </h1>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>

        {/* Content */}
        <div className="order-content">
          {/* Product Details */}
          <div className="product-details">
            <img
              src={order.imageUrl || 'placeholder-image.png'}
              alt={order.productName}
              className="product-image"
            />
            <div className="row-arrange1">
            <h2>{order.productName}</h2>
            <p className="subtitle">Driller</p>
            </div>
            <div>
            <p>
              <strong>Pickup:</strong> 
            </p>
              {order.placedOn}
            </div>
            <div>
            <p>
              <strong>Dropoff:</strong> 
            </p>
              {order.arriveOn}
            </div>
            <div>
            <p className="price">
              ₹{order.price}{' '}
              <span className="qty">Qty: {order.quantity}</span>
            </p>
            </div>
          </div>  
        </div>

        <div className="summary-info">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Rent per day</span>
              <span>₹{order.price}</span>
            </div>
            <div className="summary-item">
              <span>No of days</span>
              <span>{order.days}</span>
            </div>
            <div className="summary-item">
              <span>Delivery</span>
              <span>₹{order.delivery || '0.00'}</span>
            </div>
            <div className="summary-item">
              <span>Tax</span>
              <span>₹{order.tax}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="delivery-info">
            <p>
              <strong>Delivery To:</strong> {order.customerName},<br />
              {order.address}
            </p>
            <p>
              <strong>Contact:</strong> {order.contact}
            </p>
            <p>
              <strong>Order date:</strong> {order.orderDate}
            </p>
            <p>
              <strong>Delivery by:</strong> {order.deliveryDate}
            </p>
            <p>
              <strong>Return by:</strong> {order.returnDate}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="buttons">
        <div className="actions">{renderButtonsByStatus()}</div>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [filter, setFilter] = useState({ date: '', status: '', category: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders = [
    { id: 1, imageUrl: '/home-slide1.jpg', productName: 'Concrete Hammer', orderId: '#0101', quantity: 1, price: 300,days: 10,tax:10,total:3000, placedOn: '2024-12-10', arriveOn: '2024-12-12', status: 'Shipped', category: 'Construction' ,customerName: 'Naveen',
      address: '847 Jewess Bridge Apt. 174, London, UK',
      contact: '474–769–3919',
      orderDate: '2022-02-16',
      deliveryDate: '2024-12-12',
      returnDate: '2024-12-23',
    },
    { id: 2, imageUrl: '/home-slide1.jpg', productName: 'Concrete Drill', orderId: '#0102', quantity: 1, price: 150, placedOn: '2024-12-10', arriveOn: '2024-12-12', status: 'Payment', category: 'Construction' ,customerName: 'Naveen',
      address: '847 Jewess Bridge Apt. 174, London, UK',
      contact: '474–769–3919',
      orderDate: '2022-02-16',
      deliveryDate: '2024-12-12',
      returnDate: '2024-12-23',
    },
    { id: 3, imageUrl: '/home-slide1.jpg', productName: 'Excavator', orderId: '#0103', quantity: 1, price: 500, placedOn: '2024-12-11', arriveOn: '2024-12-13', status: 'Rejected', category: 'Excavation' ,customerName: 'Naveen',
      address: '847 Jewess Bridge Apt. 174, London, UK',
      contact: '474–769–3919',
      orderDate: '2022-02-16',
      deliveryDate: '2024-12-12',
      returnDate: '2024-12-23',},
    { id: 4, imageUrl: '/home-slide1.jpg', productName: 'Concrete Mixer', orderId: '#0104', quantity: 1, price: 350, placedOn: '2024-12-12', arriveOn: '2024-12-14', status: 'Delivered', category: 'Construction' ,customerName: 'Naveen',
      address: '847 Jewess Bridge Apt. 174, London, UK',
      contact: '474–769–3919',
      orderDate: '2022-02-16',
      deliveryDate: '2024-12-12',
      returnDate: '2024-12-23',},
    { id: 5, imageUrl: '/home-slide1.jpg', productName: 'Welding Machine', orderId: '#0105', quantity: 1, price: 250, placedOn: '2024-12-13', arriveOn: '2024-12-15', status: 'Requested', category: 'Welding',customerName: 'Naveen',
      address: '847 Jewess Bridge Apt. 174, London, UK',
      contact: '474–769–3919',
      orderDate: '2022-02-16',
      deliveryDate: '2024-12-12',
      returnDate: '2024-12-23', },
    { id: 6, imageUrl: '/home-slide1.jpg', productName: 'Forklift', orderId: '#0106', quantity: 1, price: 400, placedOn: '2024-12-14', arriveOn: '2024-12-16', status: 'Canceled', category: 'Construction',customerName: 'Naveen',
      address: '847 Jewess Bridge Apt. 174, London, UK',
      contact: '474–769–3919',
      orderDate: '2022-02-16',
      deliveryDate: '2024-12-12',
      returnDate: '2024-12-23', },
    { id: 7, imageUrl: '/home-slide1.jpg', productName: 'Crane', orderId: '#0107', quantity: 1, price: 600, placedOn: '2024-12-15', arriveOn: '2024-12-17', status: 'Returned', category: 'Excavation' ,customerName: 'Naveen',
      address: '847 Jewess Bridge Apt. 174, London, UK',
      contact: '474–769–3919',
      orderDate: '2022-02-16',
      deliveryDate: '2024-12-12',
      returnDate: '2024-12-23',},
];

  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilters = () => {
    const filtered = orders.filter(order => {
      const placedDate = new Date(order.placedOn);
      const arriveDate = new Date(order.arriveOn);
      const selectedDate = filter.date ? new Date(filter.date) : null;

      const isWithinDateRange = !filter.date || (placedDate <= selectedDate && arriveDate >= selectedDate);

      return isWithinDateRange &&
        (!filter.status || order.status === filter.status) &&
        (!filter.category || order.category === filter.category);
    });
    setFilteredOrders(filtered);
  };

  const resetFilters = () => {
    setFilter({ date: '', status: '', category: '' });
    setFilteredOrders(orders);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <DashboardLayout>
      <div className="orders-page">
        <h1>Order Status</h1>
        {/* Filter Section */}
        <div className="filter-bar">
                <input
                    type="date"
                    name="date"
                    value={filter.date}
                    onChange={handleFilterChange}
                />
         <select name="status" value={filter.status} onChange={handleFilterChange}>
                    <option value="">Order Status</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Payment">Payment</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Requested">Requested</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Returned">Returned</option>
                </select>
                <select name="category" value={filter.category} onChange={handleFilterChange}>
                    <option value="">Category</option>
                    <option value="Construction">Construction</option>
                    <option value="Excavation">Excavation</option>
                    <option value="Welding">Welding</option>
                </select>
                <button onClick={applyFilters}>Filter</button>
                <button onClick={resetFilters}>Reset Filter</button>
            </div>
        {/* Orders Table */}
        <table className="orders-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Order ID</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Placed On</th>
                        <th>Arrive On</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
          <tbody>
          {currentOrders.map((order) => (
                        <tr key={order.id}>
                            <td><img src={order.imageUrl} alt={order.productName} className="order-image" /></td>
                            <td>{order.productName}</td>
                            <td>{order.category}</td>
                            <td>{order.orderId}</td>
                            <td>{order.quantity}</td>
                            <td>${order.price}</td>
                            <td>{order.placedOn}</td>
                            <td>{order.arriveOn}</td>
                            <td>
                                <span className={`status status-${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td><button className="details-button" onClick={() => handleViewDetails(order)}>View Details</button></td>
                        </tr>
                    ))}
                </tbody>
        </table>
        <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastOrder >= filteredOrders.length}>
                    Next
                </button>
            </div>
        {/* Order Details Modal */}
        {isModalOpen && <OrderDetails order={selectedOrder} onClose={handleCloseModal} />}
        
      </div>
    </DashboardLayout>
  );
};

export default Orders;
