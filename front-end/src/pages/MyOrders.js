import React, { useState } from 'react';
import DashboardLayout from '../components/Dashboardlayout';
import '../styles/MyOrders.css';

const Orders = () => {
    const [filter, setFilter] = useState({ date: '', status: '', category: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 7;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orders = [
        { id: 1, imageUrl: '/assets/category3.png', productName: 'Concrete Hammer', category: 'Tools', orderId: '#0101', quantity: 1, price: 300, placedOn: '2024-12-12', arriveOn: '2024-12-13', status: 'Shipped' },
        { id: 2, imageUrl: '/assets/category3.png', productName: 'Drill Machine', category: 'Machinery', orderId: '#0102', quantity: 2, price: 500, placedOn: '2024-12-10', arriveOn: '2024-12-11', status: 'Payment' },
        { id: 3, imageUrl: '/assets/category3.png', productName: 'Ladder', category: 'Safety', orderId: '#0103', quantity: 1, price: 150, placedOn: '2024-12-08', arriveOn: '2024-12-09', status: 'Rejected' },
        { id: 4, imageUrl: '/assets/category3.png', productName: 'Welding Machine', category: 'Machinery', orderId: '#0104', quantity: 1, price: 700, placedOn: '2024-12-05', arriveOn: '2024-12-06', status: 'Delivered' },
        { id: 5, imageUrl: '/assets/category3.png', productName: 'Saw Cutter', category: 'Tools', orderId: '#0105', quantity: 1, price: 400, placedOn: '2024-12-01', arriveOn: '2024-12-02', status: 'Requested' },
        { id: 6, imageUrl: '/assets/category3.png', productName: 'Concrete Mixer', category: 'Heavy Equipment', orderId: '#0106', quantity: 1, price: 1200, placedOn: '2024-11-20', arriveOn: '2024-11-21', status: 'Canceled' },
        { id: 7, imageUrl: '/assets/category3.png', productName: 'Power Generator', category: 'Power Tools', orderId: '#0107', quantity: 1, price: 2000, placedOn: '2024-11-15', arriveOn: '2024-11-16', status: 'Returned' },
        { id: 8, imageUrl: '/assets/category3.png', productName: 'Air Compressor', category: 'Machinery', orderId: '#0108', quantity: 1, price: 1800, placedOn: '2024-11-25', arriveOn: '2024-11-26', status: 'Pending' },
        { id: 9, imageUrl: '/assets/category3.png', productName: 'Concrete Hammer', category: 'Tools', orderId: '#0101', quantity: 1, price: 300, placedOn: '2024-12-12', arriveOn: '2024-12-13', status: 'Shipped' },
        { id: 10, imageUrl: '/assets/category3.png', productName: 'Drill Machine', category: 'Machinery', orderId: '#0102', quantity: 2, price: 500, placedOn: '2024-12-10', arriveOn: '2024-12-11', status: 'Payment' },
        { id: 11, imageUrl: '/assets/category3.png', productName: 'Ladder', category: 'Safety', orderId: '#0103', quantity: 1, price: 150, placedOn: '2024-12-08', arriveOn: '2024-12-09', status: 'Rejected' },
        { id: 12, imageUrl: '/assets/category3.png', productName: 'Welding Machine', category: 'Machinery', orderId: '#0104', quantity: 1, price: 700, placedOn: '2024-12-05', arriveOn: '2024-12-06', status: 'Delivered' },
        { id: 13, imageUrl: '/assets/category3.png', productName: 'Saw Cutter', category: 'Tools', orderId: '#0105', quantity: 1, price: 400, placedOn: '2024-12-01', arriveOn: '2024-12-02', status: 'Requested' },
        { id: 14, imageUrl: '/assets/category3.png', productName: 'Concrete Mixer', category: 'Heavy Equipment', orderId: '#0106', quantity: 1, price: 1200, placedOn: '2024-11-20', arriveOn: '2024-11-21', status: 'Canceled' },
        { id: 15, imageUrl: '/assets/category3.png', productName: 'Power Generator', category: 'Power Tools', orderId: '#0107', quantity: 1, price: 2000, placedOn: '2024-11-15', arriveOn: '2024-11-16', status: 'Returned' },
        { id: 16, imageUrl: '/assets/category3.png', productName: 'Air Compressor', category: 'Machinery', orderId: '#0108', quantity: 1, price: 1800, placedOn: '2024-11-25', arriveOn: '2024-11-26', status: 'Pending' },
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

            const isWithinDateRange = !selectedDate || (placedDate <= selectedDate && arriveDate >= selectedDate);

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

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedOrder(null);
    };

    return (
        <DashboardLayout>
        <div className="orders-page">
            <h1>My Orders</h1>
            <div className="filter-bar">
                <input type="date" name="date" value={filter.date} onChange={handleFilterChange} />
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
                    <option value="Tools">Tools</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Heavy Equipment">Heavy Equipment</option>
                    <option value="Safety">Safety</option>
                    <option value="Power Tools">Power Tools</option>
                </select>
                <button onClick={applyFilters}>Filter</button>
                <button onClick={resetFilters}>Reset Filter</button>
            </div>

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
                            <td>{formatDate(order.placedOn)}</td>
                            <td>{formatDate(order.arriveOn)}</td>
                            <td><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                            <td><button className="details-button-order" onClick={() => openModal(order)}>View Details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastOrder >= filteredOrders.length}>Next</button>
            </div>

            {modalVisible && selectedOrder && (
    <div className="modal-overlay">
        <div className="modal">
            <div className="modal-content">
                <h2 className="modal-title">Order ID: {selectedOrder.orderId}</h2>
                <p className="modal-info">Order date: {formatDate(selectedOrder.placedOn)}</p>
                <p className="modal-info">Estimated delivery: {formatDate(selectedOrder.arriveOn)}</p>
                <div className="modal-status-container">
                    <h3 className="modal-status-title">Status: {selectedOrder.status}</h3>
                    <div className="status-bar">
                        <div className={`status-segment ${selectedOrder.status === 'Order Confirmed' ? 'active' : ''}`}></div>
                        <div className={`status-segment ${selectedOrder.status === 'Payment' ? 'active' : ''}`}></div>
                        <div className={`status-segment ${selectedOrder.status === 'Shipped' ? 'active' : ''}`}></div>
                        <div className={`status-segment ${selectedOrder.status === 'Delivered' ? 'active' : ''}`}></div>
                        <div className={`status-segment ${selectedOrder.status === 'Returned' ? 'active' : ''}`}></div>
                    </div>
                    <div className="status-labels">
                        <span>Order Confirmed</span>
                        <span>Payment</span>
                        <span>Shipment</span>
                        <span>Delivered</span>
                        <span>Returned</span>
                    </div>
                </div>
                <button className="modal-close-btn" onClick={closeModal}>Close</button>
            </div>
        </div>
    </div>

)}

        </div>
        </DashboardLayout>
    );
};

export default Orders;
