const express = require('express');
const Order = require('../models/rentalRequest');
const User = require('../models/User');
const Details = require('../models/Product');
const router = express.Router();

// Route to get the total number of users
router.get('/user-count', async (req, res) => {
    try {
        const userCount = await User.countDocuments({});
        res.status(200).json({ count: userCount });
    } catch (err) {
        console.error('Error fetching user count:', err);
        res.status(500).json({ error: 'Error fetching user count' });
    }
});

// Route to get Recent Sales for a specific user (using userId)
router.get('/sales/count', async (req, res) => {
    try {
      // Count documents where status is 'Delivered'
      const deliveredSalesCount = await Order.countDocuments({ status: 'Returned' });
      res.status(200).json({ count: deliveredSalesCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to count delivered sales' });
    }
  });

  router.get('/sales/recent', async (req, res) => {
    try {
      // Fetch recent sales (for example, all orders with a "Delivered" status)
      const recentSales = await Order.find({
        status: { $in: ['Delivered', 'Returned', 'Cancelled', 'Pending', 'Payment'] }, 
      })
        .populate('productId', 'name price') // Populate product details
        .populate('customerId', 'firstName lastName'); // Populate customer details
  
      if (!recentSales.length) {
        return res.status(404).json({ message: 'No recent sales found' });
      }
  
      res.status(200).json(recentSales);
    } catch (error) {
      console.error('Error fetching recent sales:', error);
      res.status(500).json({ message: 'Failed to fetch recent sales', error: error.message });
    }
  });
  
  // Route to fetch top products sorted by price in descending order
  router.get('/products/top', async (req, res) => {
    try {
      const topProducts = await Details.find({}, 'name price images') // Select only required fields
        .sort({ price: -1 }) // Sort by price in descending order
        .limit(6); // Limit the number of products (adjust as needed)
  
      if (!topProducts.length) {
        return res.status(404).json({ message: 'No products found' });
      }
  
      res.status(200).json(topProducts);
    } catch (error) {
      console.error('Error fetching top products:', error);
      res.status(500).json({ message: 'Failed to fetch top products', error: error.message });
    }
  });

  router.get('/activities/recent', async (req, res) => {
    try {
        const recentUsers = await User.find({}, 'username createdAt')
            .sort({ createdAt: -1 })
            .limit(5);

        const recentProducts = await Details.find({}, 'name createdAt')
            .sort({ createdAt: -1 })
            .limit(5);

        const recentOrders = await Order.find({}, 'orderId status ')
            .sort({ orderDate: -1 })
            .limit(5)
            .populate('productId', 'name')
            .populate('customerId', 'username');

        const activities = [
            ...recentUsers.map(user => ({
                time: user.createdAt,
                type: 'User',
                description: `User account created: ${user.username}`,
            })),
            ...recentProducts.map(product => ({
                time: product.createdAt,
                type: 'Product',
                description: `Product added: ${product.name}`,
            })),
            ...recentOrders.map(order => ({
                time: order.orderDate,
                type: 'Order',
                description: `Order ${order.orderId} is ${order.status} (Product: ${order.productId?.name})`,
            })),
        ];

        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching recent activities:', error);
        res.status(500).json({ message: 'Failed to fetch recent activities', error: error.message });
    }
});
  
module.exports = router;
